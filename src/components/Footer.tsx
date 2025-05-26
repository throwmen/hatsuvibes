"use client";

import {
  Heart,
  Mail,
  Shield,
  HelpCircle,
  Globe,
  Users,
  FileText,
  Cookie,
  Database,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de suscripción
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8 border-t border-emerald-900/50">
      {/* Efecto de partículas sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-teal-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Suscripción - Mejorado con animaciones */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Sé parte de
              </span>
              <br />
              <span className="text-white">nuestra comunidad</span>
            </h2>

            {subscribed ? (
              <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-6 text-center">
                <Heart className="mx-auto h-8 w-8 text-emerald-400 mb-3" />
                <p className="text-emerald-100 font-medium">
                  ¡Gracias por suscribirte!
                </p>
                <p className="text-sm text-emerald-300 mt-1">
                  Pronto recibirás nuestras novedades.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="autorizacion"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                    />
                  </div>
                  <label
                    htmlFor="autorizacion"
                    className="text-sm text-slate-400"
                  >
                    Acepto tratamiento de datos personales conforme a la
                    política de privacidad.
                  </label>
                </div>
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20"
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>

          {/* Ayuda - Con iconos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Ayuda
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { icon: Mail, label: "Contáctanos", href: "#contacto" },
                { icon: Globe, label: "Hatsu en el mundo", href: "#mundo" },
                { icon: Users, label: "Hatsu Magic Team", href: "#team" },
                { icon: Shield, label: "Información legal", href: "#legal" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-slate-300 hover:text-white group transition-colors duration-200"
                  >
                    <item.icon className="h-4 w-4 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Con iconos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Legal
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                {
                  icon: FileText,
                  label: "Términos y condiciones",
                  href: "#terminos",
                },
                {
                  icon: Cookie,
                  label: "Políticas de cookies",
                  href: "#cookies",
                },
                {
                  icon: Database,
                  label: "Tratamiento de datos",
                  href: "#datos",
                },
                {
                  icon: Phone,
                  label: "Canales de atención",
                  href: "#atencion",
                },
                {
                  icon: Shield,
                  label: "Superintendencia de industria y comercio",
                  href: "#sic",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-slate-300 hover:text-white group transition-colors duration-200"
                  >
                    <item.icon className="h-4 w-4 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Redes sociales y derechos */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Facebook className="h-5 w-5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Hatsu. Todos los derechos reservados.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Diseñado con ♥ para amantes del té
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
