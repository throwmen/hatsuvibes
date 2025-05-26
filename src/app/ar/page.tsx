"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function EnhancedArApp() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [detectionMode, setDetectionMode] = useState("motion");

  useEffect(() => {
    let previousFrame = null;
    let rotationSpeed = 0.01;
    let cubes = [];
    let scene, camera, renderer;
    let frameCount = 0;

    // Variables para tracking de color
    let targetColor = { r: 255, g: 0, b: 0 }; // Rojo por defecto
    let colorThreshold = 50;

    // Variables para detección de esquinas
    let corners = [];

    const detectColorBlob = (imageData) => {
      const width = 64;
      const height = 48;
      const blobs = [];

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const index = (y * width + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];

          const colorDistance = Math.sqrt(
            (r - targetColor.r) ** 2 +
              (g - targetColor.g) ** 2 +
              (b - targetColor.b) ** 2
          );

          if (colorDistance < colorThreshold) {
            blobs.push({ x: x / width, y: y / height });
          }
        }
      }

      if (blobs.length > 5) {
        // Calcular centro del blob
        const centerX =
          blobs.reduce((sum, blob) => sum + blob.x, 0) / blobs.length;
        const centerY =
          blobs.reduce((sum, blob) => sum + blob.y, 0) / blobs.length;
        return { x: centerX, y: centerY, size: blobs.length };
      }

      return null;
    };

    const detectEdges = (imageData) => {
      const width = 64;
      const height = 48;
      const edges = [];

      // Filtro Sobel simplificado
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const getGray = (px, py) => {
            const index = (py * width + px) * 4;
            return (
              (imageData.data[index] +
                imageData.data[index + 1] +
                imageData.data[index + 2]) /
              3
            );
          };

          const gx =
            -getGray(x - 1, y - 1) +
            getGray(x + 1, y - 1) -
            2 * getGray(x - 1, y) +
            2 * getGray(x + 1, y) -
            getGray(x - 1, y + 1) +
            getGray(x + 1, y + 1);
          const gy =
            -getGray(x - 1, y - 1) -
            2 * getGray(x, y - 1) -
            getGray(x + 1, y - 1) +
            getGray(x - 1, y + 1) +
            2 * getGray(x, y + 1) +
            getGray(x + 1, y + 1);

          const magnitude = Math.sqrt(gx * gx + gy * gy);

          if (magnitude > 30) {
            edges.push({ x: x / width, y: y / height, strength: magnitude });
          }
        }
      }

      return edges;
    };

    const detectMotion = () => {
      const hiddenCanvas = hiddenCanvasRef.current;
      const video = videoRef.current;
      if (!hiddenCanvas || !video) return { motion: 0, analysis: null };

      const context = hiddenCanvas.getContext("2d");
      if (!context) return { motion: 0, analysis: null };

      context.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
      const currentFrame = context.getImageData(
        0,
        0,
        hiddenCanvas.width,
        hiddenCanvas.height
      );

      let analysis = null;

      // Análisis según el modo
      if (detectionMode === "color") {
        analysis = detectColorBlob(currentFrame);
      } else if (detectionMode === "edges") {
        analysis = detectEdges(currentFrame);
      }

      if (!previousFrame) {
        previousFrame = currentFrame;
        return { motion: 0, analysis };
      }

      let diff = 0;
      let motionCenters = [];

      // Detectar áreas de movimiento
      for (let y = 0; y < 48; y += 4) {
        for (let x = 0; x < 64; x += 4) {
          let regionDiff = 0;
          for (let dy = 0; dy < 4; dy++) {
            for (let dx = 0; dx < 4; dx++) {
              const i = ((y + dy) * 64 + (x + dx)) * 4;
              if (i < currentFrame.data.length) {
                const avgCurrent =
                  (currentFrame.data[i] +
                    currentFrame.data[i + 1] +
                    currentFrame.data[i + 2]) /
                  3;
                const avgPrev =
                  (previousFrame.data[i] +
                    previousFrame.data[i + 1] +
                    previousFrame.data[i + 2]) /
                  3;
                regionDiff += Math.abs(avgCurrent - avgPrev);
              }
            }
          }

          if (regionDiff > 500) {
            // Umbral para detectar movimiento significativo
            motionCenters.push({
              x: (x + 2) / 64,
              y: (y + 2) / 48,
              intensity: regionDiff,
            });
          }
          diff += regionDiff;
        }
      }

      previousFrame = currentFrame;

      return {
        motion: diff / (currentFrame.data.length / 4),
        analysis,
        motionCenters,
      };
    };

    const updateCubes = (detectionData) => {
      // Limpiar cubos antiguos
      cubes.forEach((cube) => scene.remove(cube));
      cubes = [];

      if (detectionMode === "motion" && detectionData.motionCenters) {
        detectionData.motionCenters.forEach((center, index) => {
          if (index < 5) {
            // Máximo 5 cubos
            const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            const hue = (index * 0.2) % 1;
            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color().setHSL(hue, 1, 0.5),
              transparent: true,
              opacity: 0.8,
            });
            const cube = new THREE.Mesh(geometry, material);

            // Convertir coordenadas de la imagen a coordenadas 3D
            cube.position.x = (center.x - 0.5) * 8;
            cube.position.y = -(center.y - 0.5) * 6;
            cube.position.z = Math.sin(frameCount * 0.1 + index) * 2;

            scene.add(cube);
            cubes.push(cube);
          }
        });
      } else if (detectionMode === "color" && detectionData.analysis) {
        const blob = detectionData.analysis;
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: 0.7,
          wireframe: true,
        });
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = (blob.x - 0.5) * 8;
        sphere.position.y = -(blob.y - 0.5) * 6;
        sphere.position.z = 0;

        scene.add(sphere);
        cubes.push(sphere);
      } else if (detectionMode === "edges" && detectionData.analysis) {
        const edges = detectionData.analysis;
        const strongEdges = edges
          .filter((edge) => edge.strength > 50)
          .slice(0, 20);

        strongEdges.forEach((edge, index) => {
          const geometry = new THREE.ConeGeometry(0.1, 0.3, 4);
          const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: edge.strength / 100,
          });
          const cone = new THREE.Mesh(geometry, material);

          cone.position.x = (edge.x - 0.5) * 8;
          cone.position.y = -(edge.y - 0.5) * 6;
          cone.position.z = 0;

          scene.add(cone);
          cubes.push(cone);
        });
      }
    };

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment", // Cámara trasera si está disponible
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        if (canvasRef.current) {
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 5;

          renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
          });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x000000, 0);

          // Iluminación para mejor visualización
          const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
          scene.add(ambientLight);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(1, 1, 1);
          scene.add(directionalLight);

          const animate = () => {
            requestAnimationFrame(animate);
            frameCount++;

            const detectionData = detectMotion();

            // Actualizar objetos 3D basado en la detección
            updateCubes(detectionData);

            // Animar cubos existentes
            cubes.forEach((cube, index) => {
              cube.rotation.x += 0.01;
              cube.rotation.y += 0.02;

              // Efecto de flotación
              if (cube.geometry.type === "BoxGeometry") {
                cube.position.z += Math.sin(frameCount * 0.05 + index) * 0.01;
              }
            });

            renderer.render(scene, camera);
          };

          animate();
          setIsCalibrated(true);
        }
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });

    // Cleanup
    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [detectionMode]);

  const calibrateColor = () => {
    const hiddenCanvas = hiddenCanvasRef.current;
    const video = videoRef.current;
    if (!hiddenCanvas || !video) return;

    const context = hiddenCanvas.getContext("2d");
    context.drawImage(video, 0, 0, 64, 48);
    const imageData = context.getImageData(0, 0, 64, 48);

    // Tomar color del centro de la imagen
    const centerIndex = (24 * 64 + 32) * 4;
    targetColor = {
      r: imageData.data[centerIndex],
      g: imageData.data[centerIndex + 1],
      b: imageData.data[centerIndex + 2],
    };

    alert(
      `Color calibrado: RGB(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`
    );
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Video de la cámara */}
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        muted
        playsInline
      />

      {/* Canvas de Three.js */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Canvas oculto para análisis */}
      <canvas
        ref={hiddenCanvasRef}
        width={64}
        height={48}
        style={{ display: "none" }}
      />

      {/* Controles */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2,
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
          Modo de Detección:
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="radio"
              value="motion"
              checked={detectionMode === "motion"}
              onChange={(e) => setDetectionMode(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            Detección de Movimiento
          </label>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="radio"
              value="color"
              checked={detectionMode === "color"}
              onChange={(e) => setDetectionMode(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            Tracking de Color
          </label>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              value="edges"
              checked={detectionMode === "edges"}
              onChange={(e) => setDetectionMode(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            Detección de Bordes
          </label>
        </div>

        {detectionMode === "color" && (
          <button
            onClick={calibrateColor}
            style={{
              padding: "8px 12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Calibrar Color Central
          </button>
        )}

        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            opacity: 0.8,
          }}
        >
          {!isCalibrated ? "Iniciando cámara..." : "✓ AR Activo"}
        </div>
      </div>

      {/* Indicador central para calibración de color */}
      {detectionMode === "color" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "20px",
            border: "2px solid red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export default EnhancedArApp;
