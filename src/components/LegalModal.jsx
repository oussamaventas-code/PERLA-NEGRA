import { useEffect } from 'react';
import { X } from 'lucide-react';

const LEGAL_CONTENT = {
  aviso: {
    title: 'Aviso Legal',
    body: (
      <>
        <h3>1. Datos identificativos</h3>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es
          titularidad de <strong>Perla Negra Tattoo</strong> [Razón social / Nombre y apellidos del
          titular], con NIF [NIF], y domicilio en Calle Profesor Joaquín Abellán, 30500 Molina de
          Segura, Murcia. Contacto: teléfono 648 75 00 92.
        </p>
        <h3>2. Objeto</h3>
        <p>
          El presente sitio web tiene carácter informativo sobre los servicios de tatuaje,
          formación y eliminación láser ofrecidos por el estudio, así como la gestión de
          solicitudes de cita a través de los canales de contacto indicados.
        </p>
        <h3>3. Propiedad intelectual e industrial</h3>
        <p>
          Todos los contenidos de este sitio (textos, fotografías, diseños, logotipos y obras
          gráficas, incluidas las piezas de tatuaje mostradas) son titularidad de Perla Negra
          Tattoo o de sus autores, y están protegidos por la normativa de propiedad intelectual.
          Queda prohibida su reproducción, distribución o comunicación pública sin autorización
          expresa.
        </p>
        <h3>4. Responsabilidad</h3>
        <p>
          El titular no se hace responsable del mal uso que se realice de los contenidos de este
          sitio web, ni de los daños derivados de circunstancias técnicas ajenas a su control. Los
          enlaces a sitios de terceros (WhatsApp, redes sociales) se rigen por sus propias
          condiciones.
        </p>
        <h3>5. Legislación aplicable</h3>
        <p>
          La relación entre el titular y los usuarios se rige por la normativa española. Cualquier
          controversia se someterá a los juzgados y tribunales competentes conforme a la
          legislación vigente.
        </p>
      </>
    ),
  },
  privacidad: {
    title: 'Política de Privacidad',
    body: (
      <>
        <h3>1. Responsable del tratamiento</h3>
        <p>
          <strong>Perla Negra Tattoo</strong> [Razón social / Nombre y apellidos del titular], NIF
          [NIF], Calle Profesor Joaquín Abellán, 30500 Molina de Segura, Murcia. Teléfono:
          648 75 00 92.
        </p>
        <h3>2. Datos que tratamos y finalidad</h3>
        <p>
          Este sitio web no incorpora formularios propios ni instala cookies de seguimiento. Los
          datos personales que nos facilites al contactar por WhatsApp o teléfono (nombre, número
          de teléfono y el contenido de tu consulta) se utilizan exclusivamente para gestionar tu
          solicitud de información o cita.
        </p>
        <h3>3. Base jurídica</h3>
        <p>
          El tratamiento se basa en la aplicación de medidas precontractuales solicitadas por el
          interesado y en su consentimiento al iniciar el contacto (art. 6.1.a y 6.1.b RGPD).
        </p>
        <h3>4. Conservación y destinatarios</h3>
        <p>
          Los datos se conservarán el tiempo necesario para gestionar tu solicitud y las
          obligaciones legales derivadas. No se ceden datos a terceros, salvo obligación legal.
          Ten en cuenta que la comunicación por WhatsApp está sujeta a la política de privacidad
          de WhatsApp LLC.
        </p>
        <h3>5. Derechos</h3>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad dirigiéndote al estudio en la dirección postal indicada o por teléfono.
          También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).
        </p>
        <h3>6. Tipografías de terceros</h3>
        <p>
          Este sitio utiliza tipografías servidas por Google Fonts, lo que implica que tu
          navegador realiza una petición técnica a servidores de Google Ireland Ltd. al cargar la
          página. No se transmite ningún otro dato personal por nuestra parte.
        </p>
      </>
    ),
  },
};

export default function LegalModal({ type, onClose }) {
  const content = type ? LEGAL_CONTENT[type] : null;

  useEffect(() => {
    if (!content) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [content, onClose]);

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
    >
      <div
        className="absolute inset-0 bg-obsidiana/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#12121A] p-8 md:p-12 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-marfil/70 hover:text-champagne hover:border-champagne/40 transition-colors"
        >
          <X size={16} />
        </button>
        <h2 className="font-drama text-2xl md:text-3xl text-marfil mb-8">{content.title}</h2>
        <div className="legal-content text-sm font-light leading-relaxed text-marfil/70 space-y-4 [&_h3]:text-champagne [&_h3]:font-mono [&_h3]:text-xs [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:mt-8 [&_h3]:mb-2 [&_strong]:text-marfil">
          {content.body}
        </div>
        <p className="mt-10 text-[10px] font-mono uppercase tracking-widest text-marfil/30">
          Última actualización: junio 2026
        </p>
      </div>
    </div>
  );
}
