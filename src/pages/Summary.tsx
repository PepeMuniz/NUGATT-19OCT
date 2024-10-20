import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface SummaryState {
  brand: string;
  otherBrand: string;
  model: string;
  storage: string;
  color: string;
  batteryHealth: string;
  screenCondition: string;
  physicalCondition: string;
  quotation: number | null;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const Summary: React.FC = () => {
  const location = useLocation();
  const state = location.state as SummaryState;

  const {
    brand,
    otherBrand,
    model,
    storage,
    color,
    batteryHealth,
    screenCondition,
    physicalCondition,
    quotation,
    contactInfo
  } = state;

  const isOtherBrand = brand === 'Otro';
  const displayBrand = isOtherBrand ? otherBrand : brand;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#2C0E8C]">Resumen de tu oferta</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <h2 className="text-xl text-[#2C0E8C] p-4 bg-gray-50">Información del dispositivo</h2>
          <div className="p-6 space-y-2 divide-y divide-gray-200">
            <p className="py-2"><span className="font-medium">Marca:</span> {displayBrand}</p>
            <p className="py-2"><span className="font-medium">Modelo:</span> {model}</p>
            <p className="py-2"><span className="font-medium">Almacenamiento:</span> {storage}</p>
            <p className="py-2"><span className="font-medium">Color:</span> {color}</p>
            {batteryHealth && <p className="py-2"><span className="font-medium">Estado de la batería:</span> {batteryHealth}</p>}
            <p className="py-2"><span className="font-medium">Estado de la pantalla:</span> {screenCondition}</p>
            <p className="py-2"><span className="font-medium">Estado físico:</span> {physicalCondition}</p>
          </div>
        </div>

        {!isOtherBrand && quotation && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <h2 className="text-xl text-[#2C0E8C] p-4 bg-gray-50">Oferta aceptada</h2>
            <div className="p-6">
              <p className="text-2xl font-bold text-[#2C0E8C]">${quotation.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              <p className="text-sm text-gray-500 mt-2">Esta oferta es estimada y puede variar si al realizar la revisión física del equipo la información proporcionada en el formulario varía del estado real del dispositivo.</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <h2 className="text-xl text-[#2C0E8C] p-4 bg-gray-50">Información de contacto</h2>
          <div className="p-6 space-y-2 divide-y divide-gray-200">
            <p className="py-2"><span className="font-medium">Nombre:</span> {contactInfo.name}</p>
            <p className="py-2"><span className="font-medium">Email:</span> {contactInfo.email}</p>
            <p className="py-2"><span className="font-medium">Teléfono:</span> {contactInfo.phone}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <h2 className="text-xl text-[#2C0E8C] p-4 bg-gray-50">Próximos pasos</h2>
          <div className="p-6">
            {isOtherBrand ? (
              <>
                <p className="mb-4">Hemos recibido tu solicitud de oferta para tu dispositivo. Nuestro equipo se pondrá en contacto contigo en un lapso máximo de 24 horas con una oferta personalizada.</p>
                <p className="mb-4">Con la venta de tu dispositivo estás contribuyendo a la conservación del planeta, muy pronto tu equipo tendrá una nueva vida.</p>
                <p className="text-2xl font-bold text-[#2C0E8C] text-center mt-6">¡Gracias!</p>
              </>
            ) : (
              <>
                <p className="mb-4">Gracias por aceptar nuestra oferta. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para coordinar el envío de tu dispositivo y finalizar el proceso de venta.</p>
                <p className="mb-4">Por favor, asegúrate de tener a mano la siguiente información:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Tu dispositivo y todos sus accesorios</li>
                  <li>Una identificación válida</li>
                  <li>Información de tu cuenta bancaria para el pago</li>
                </ul>
                <p className="mb-4">Con la venta de tu dispositivo estás contribuyendo a la conservación del planeta, muy pronto tu equipo tendrá una nueva vida.</p>
                <p className="text-2xl font-bold text-[#2C0E8C] text-center mt-6">¡Gracias!</p>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="bg-[#2C0E8C] text-white py-2 px-6 rounded-full hover:bg-[#1F0A66] transition-colors inline-block">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;