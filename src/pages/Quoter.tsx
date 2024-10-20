import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Definir opciones para cada marca
const brandOptions = {
  Apple: {
    models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone 6s Plus', 'iPhone 6s', 'iPhone SE (3rd generation)', 'iPhone SE (2nd generation)', 'iPhone SE (1st generation)'],
    colors: ['Negro espacial', 'Plata', 'Oro', 'Azul Sierra', 'Verde medianoche', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Morado', 'Rosa', 'Amarillo', 'Coral', 'Gris espacial'],
  },
  Samsung: {
    models: ['Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy S20 Ultra', 'Galaxy S20+', 'Galaxy S20', 'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy A53', 'Galaxy A52', 'Galaxy A51', 'Galaxy A32', 'Galaxy A13'],
    colors: ['Negro fantasma', 'Blanco fantasma', 'Gris', 'Azul', 'Lavanda', 'Verde', 'Rojo', 'Rosa', 'Bronce', 'Plata', 'Dorado', 'Azul marino'],
  },
  Huawei: {
    models: ['P40 Pro+', 'P40 Pro', 'P40', 'P30 Pro', 'P30', 'Mate 40 Pro', 'Mate 30 Pro', 'Nova 8', 'Nova 7'],
    colors: ['Negro', 'Plata', 'Dorado', 'Azul', 'Verde esmeralda', 'Naranja', 'Morado'],
  },
};

const Quoter: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [otherBrand, setOtherBrand] = useState('');
  const [model, setModel] = useState('');
  const [storage, setStorage] = useState('');
  const [color, setColor] = useState('');
  const [batteryHealth, setBatteryHealth] = useState('');
  const [screenCondition, setScreenCondition] = useState('');
  const [physicalCondition, setPhysicalCondition] = useState('');
  const [quotation, setQuotation] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [fieldToChange, setFieldToChange] = useState<{ field: string; value: string } | null>(null);
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: string) => {
    if (showContactForm) {
      setShowWarningPopup(true);
      setFieldToChange({ field, value });
    } else {
      updateField(field, value);
    }
  };

  const updateField = (field: string, value: string) => {
    switch (field) {
      case 'brand':
        setBrand(value);
        setModel('');
        setColor('');
        setBatteryHealth('');
        setStorage('');
        setScreenCondition('');
        setPhysicalCondition('');
        break;
      case 'otherBrand':
        setOtherBrand(value);
        break;
      case 'model':
        setModel(value);
        setColor('');
        setStorage('');
        setScreenCondition('');
        setPhysicalCondition('');
        break;
      case 'storage':
        setStorage(value);
        setScreenCondition('');
        setPhysicalCondition('');
        break;
      case 'color':
        setColor(value);
        setScreenCondition('');
        setPhysicalCondition('');
        break;
      case 'batteryHealth':
        setBatteryHealth(value);
        setScreenCondition('');
        setPhysicalCondition('');
        break;
      case 'screenCondition':
        setScreenCondition(value);
        setPhysicalCondition('');
        break;
      case 'physicalCondition':
        setPhysicalCondition(value);
        break;
    }
  };

  const resetForm = () => {
    setBrand('');
    setOtherBrand('');
    setModel('');
    setStorage('');
    setColor('');
    setBatteryHealth('');
    setScreenCondition('');
    setPhysicalCondition('');
    setQuotation(null);
    setShowConfirmation(false);
    setShowContactForm(false);
    setContactInfo({ name: '', email: '', phone: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete()) {
      if (brand === 'Otro') {
        setShowContactForm(true);
      } else {
        const randomQuotation = Math.floor(Math.random() * 10000) + 1000;
        setQuotation(randomQuotation);
        setShowConfirmation(true);
      }
    } else {
      alert('Por favor, completa todos los campos antes de solicitar una oferta.');
    }
  };

  const handleConfirmation = (confirm: boolean) => {
    if (confirm) {
      setShowContactForm(true);
      setShowConfirmation(false);
    } else {
      resetForm();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de contacto:', contactInfo);
    // Aquí iría la lógica para enviar el correo electrónico
    navigate('/summary', { 
      state: { 
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
      } 
    });
  };

  const isFormComplete = () => {
    const requiredFields = [
      brand,
      brand === 'Otro' ? otherBrand : true,
      model,
      storage,
      color,
      screenCondition,
      physicalCondition,
      brand === 'Apple' ? batteryHealth : true
    ];
    return requiredFields.every(field => field !== '');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-[#2C0E8C]">Convierte tu antiguo smartphone en dinero</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl text-[#2C0E8C] mb-4">Información del dispositivo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                  <div className="relative">
                    <select
                      value={brand}
                      onChange={(e) => handleFieldChange('brand', e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                    >
                      <option value="">Selecciona una marca</option>
                      {Object.keys(brandOptions).map((brandName) => (
                        <option key={brandName} value={brandName}>{brandName}</option>
                      ))}
                      <option value="Otro">Otro</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {brand === 'Otro' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especifica la marca</label>
                    <input
                      type="text"
                      value={otherBrand}
                      onChange={(e) => handleFieldChange('otherBrand', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      placeholder="Ej: Xiaomi, OnePlus, Motorola"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
                  {brand === 'Otro' ? (
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => handleFieldChange('model', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      placeholder="Ej: Redmi Note 10, OnePlus 9 Pro"
                      disabled={!otherBrand}
                    />
                  ) : (
                    <select
                      value={model}
                      onChange={(e) => handleFieldChange('model', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      disabled={!brand || brand === 'Otro'}
                    >
                      <option value="">Selecciona un modelo</option>
                      {brand && brand !== 'Otro' && brandOptions[brand as keyof typeof brandOptions].models.map((modelName) => (
                        <option key={modelName} value={modelName}>{modelName}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Almacenamiento</label>
                  {brand === 'Otro' ? (
                    <input
                      type="text"
                      value={storage}
                      onChange={(e) => handleFieldChange('storage', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      placeholder="Ej: 64GB, 128GB, 256GB"
                      disabled={!model}
                    />
                  ) : (
                    <select
                      value={storage}
                      onChange={(e) => handleFieldChange('storage', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      disabled={!model}
                    >
                      <option value="">Selecciona el almacenamiento</option>
                      <option value="16GB">16GB</option>
                      <option value="32GB">32GB</option>
                      <option value="64GB">64GB</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  {brand === 'Otro' ? (
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleFieldChange('color', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      placeholder="Ej: Negro, Blanco, Azul"
                      disabled={!storage}
                    />
                  ) : (
                    <select
                      value={color}
                      onChange={(e) => handleFieldChange('color', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      disabled={!storage}
                    >
                      <option value="">Selecciona el color</option>
                      {brand && brand !== 'Otro' && brandOptions[brand as keyof typeof brandOptions].colors.map((colorName) => (
                        <option key={colorName} value={colorName}>{colorName}</option>
                      ))}
                    </select>
                  )}
                </div>

                {brand === 'Apple' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado de la batería</label>
                    <select
                      value={batteryHealth}
                      onChange={(e) => handleFieldChange('batteryHealth', e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C0E8C] focus:border-transparent"
                      disabled={!color}
                    >
                      <option value="">Selecciona el estado de la batería</option>
                      <option value="90% - 100%">90% - 100%</option>
                      <option value="80% - 89%">80% - 89%</option>
                      <option value="70% - 79%">70% - 79%</option>
                      <option value="Menos de 70%">Menos de 70%</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl text-[#2C0E8C] mb-4">Estado de la pantalla</h2>
              <div className="space-y-2">
                {['Impecable', 'Bueno', 'Usado', 'Roto'].map((condition) => (
                  <label key={condition} className="flex items-center p-3 border rounded-lg">
                    <input
                      type="radio"
                      value={condition}
                      checked={screenCondition === condition}
                      onChange={(e) => handleFieldChange('screenCondition', e.target.value)}
                      className="mr-2"
                      disabled={!color || (brand === 'Apple' && !batteryHealth)}
                    />
                    <div>
                      <span className="font-medium">{condition}</span>
                      <p className="text-sm text-gray-500 mt-1">
                        {condition === 'Impecable' && "Aspecto impecable sin rasguños visibles. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona."}
                        {condition === 'Bueno' && "Pequeñas marcas de uso, imperceptibles a 20 cm de distancia. Sin grietas ni golpes. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona."}
                        {condition === 'Usado' && "Marcas de uso visibles, incluidos rasguños profundos, abolladuras o ambas cosas en la parte exterior del dispositivo, que no afectan a su funcionalidad. Sin grietas. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona."}
                        {condition === 'Roto' && "Tiene una o más grietas y puede que no funcione al 100%."}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl text-[#2C0E8C] mb-4">Estado físico del dispositivo</h2>
              <div className="space-y-2">
                {['Impecable', 'Bueno', 'Usado', 'Roto'].map((condition) => (
                  <label key={condition} className="flex items-center p-3 border rounded-lg">
                    <input
                      type="radio"
                      value={condition}
                      checked={physicalCondition === condition}
                      onChange={(e) => handleFieldChange('physicalCondition', e.target.value)}
                      className="mr-2"
                      disabled={!screenCondition}
                    />
                    <div>
                      <span className="font-medium">{condition}</span>
                      <p className="text-sm text-gray-500 mt-1">
                        {condition === 'Impecable' && "Aspecto impecable sin rasguños visibles."}
                        {condition === 'Bueno' && "Pequeñas marcas de uso, imperceptibles a 20 cm de distancia. Sin grietas ni golpes."}
                        {condition === 'Usado' && "Tiene marcas de uso visibles, incluyendo rasguños profundos y golpes y/o marcas en la parte exterior del producto, sin afectar a su funcionamiento. Sin grietas."}
                        {condition === 'Roto' && "Tiene marcas de uso visibles, incluyendo rasguños profundos y golpes y/o marcas en la parte exterior del producto."}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#2C0E8C] text-white py-2 px-4 rounded-full hover:bg-[#1F0A66] transition-colors w-full sm:w-auto text-lg"
            >
              Obtener oferta
            </button>
          </form>
        </div>
        
        <div className="lg:w-1/3">
          <div className="sticky top-8">
            <h2 className="text-2xl text-[#2C0E8C] mb-6">Tu equipo</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              {brand && <p className="py-2 border-b border-gray-300 text-sm">Marca: {brand === 'Otro' ? otherBrand : brand}</p>}
              {model && <p className="py-2 border-b border-gray-300 text-sm">Modelo: {model}</p>}
              {storage && <p className="py-2 border-b border-gray-300 text-sm">Almacenamiento: {storage}</p>}
              {color && <p className="py-2 border-b border-gray-300 text-sm">Color: {color}</p>}
              {brand === 'Apple' && batteryHealth && (
                <p className="py-2 border-b border-gray-300 text-sm">Estado de la batería: {batteryHealth}</p>
              )}
              {screenCondition && <p className="py-2 border-b border-gray-300 text-sm">Estado de la pantalla: {screenCondition}</p>}
              {physicalCondition && <p className="py-2 text-sm">Estado físico: {physicalCondition}</p>}
              {quotation !== null && (
                <div className="mt-4">
                  <p className="py-2 text-lg font-bold text-[#2C0E8C]">Oferta estimada: ${quotation.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">Esta oferta es estimada y puede variar si al realizar la revisión física del equipo la información proporcionada en el formulario varía del estado real del dispositivo.</p>
                  {showConfirmation && (
                    <div className="mt-4">
                      <p className="mb-2">¿Aceptas la oferta?</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConfirmation(true)}
                          className="bg-[#2C0E8C] text-white px-4 py-2 rounded-md hover:bg-[#1F0A66] transition-colors"
                        >
                          Sí, continuar
                        </button>
                        <button
                          onClick={() => handleConfirmation(false)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          No, cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showContactForm && (
                <div className="mt-4">
                  <p className="text-sm text-[#2C0E8C] mb-4">
                    {brand === 'Otro'
                      ? "Gracias por querer vender tu equipo con nosotros, nuestro equipo se comunicará contigo en un lapso máximo de 24 horas con una oferta por tu dispositivo."
                      : "Gracias por querer vender tu dispositivo con nosotros. Por el momento estamos presentando un alto volumen de ofertas. Por favor déjanos tus datos y nos pondremos en contacto contigo en un lapso de máximo 24 horas para indicarte los pasos a seguir."}
                  </p>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        id="name"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C0E8C] focus:ring-[#2C0E8C] px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C0E8C] focus:ring-[#2C0E8C] px-4 py-2"
                        required
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Celular / WhatsApp (10 dígitos)</label>
                      <input
                        type="tel"
                        id="phone"
                        value={contactInfo.phone}
                        onChange={(e) => {
                          const formattedPhone = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1-').slice(0, 14);
                          setContactInfo({...contactInfo, phone: formattedPhone});
                        }}
                        placeholder="55-55-55-55-55"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C0E8C] focus:ring-[#2C0E8C] px-4 py-2"
                        required
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#2C0E8C] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1F0A66] transition-colors"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showWarningPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-[#2C0E8C] mb-4">Confirmar cambio</h3>
            <p className="mb-6 text-gray-600">¿Estás seguro de que deseas cambiar la información? Toda la información y la oferta actual se perderán.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowWarningPopup(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowWarningPopup(false);
                  if (fieldToChange) {
                    resetForm();
                    updateField(fieldToChange.field, fieldToChange.value);
                  }
                }}
                className="px-4 py-2 bg-[#2C0E8C] text-white rounded-md hover:bg-[#1F0A66] transition-colors"
              >
                Sí, cambiar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quoter;