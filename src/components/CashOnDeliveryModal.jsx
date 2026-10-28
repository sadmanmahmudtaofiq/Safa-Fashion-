import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, MapPin, Phone, User, MessageCircle, AlertCircle } from 'lucide-react';
import { BANGLADESH_DISTRICTS, formatPrice } from '../data/products.js';

export default function CashOnDeliveryModal({
  isOpen,
  onClose,
  product,
  selectedSize,
  quantity
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen || !product) return null;

  const subtotal = product.price * quantity;
  const isFreeDelivery = subtotal >= 5000;
  const deliveryCharge = isFreeDelivery ? 0 : district === 'Dhaka' ? 70 : 130;
  const grandTotal = subtotal + deliveryCharge;

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    const phoneRegex = /^01[3-9]\d{8}$/;
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your mobile phone number.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01700123456).';
    }
    if (!address.trim()) errs.address = 'Please specify your full delivery address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedId = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const whatsappConfirmLink = () => {
    const text = `Hello SAFA FASHION! I have placed an online order:%0A%0A📦 Order ID: ${orderId}%0A👗 Product: ${product.name} (${product.code})%0A📏 Type/Size: ${selectedSize}%0A🔢 Quantity: ${quantity}%0A💰 Total Payable: ${formatPrice(grandTotal)} (Cash on Delivery)%0A👤 Customer: ${name}%0A📱 Phone: ${phone}%0A📍 District: ${district}%0A🏠 Address: ${address}%0A%0APlease confirm my order delivery!`;
    return `https://wa.me/8801700123456?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Order Confirmation Screen */
          <div className="text-center py-4 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              Order Placed Successfully!
            </span>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
              Thank You, {name}!
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
              Your Cash on Delivery order has been registered. Our representative will contact you via phone shortly before dispatching your package.
            </p>

            {/* Order Invoice Details Card */}
            <div className="mt-5 p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-[#5b1d28] text-sm">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Item:</span>
                <span className="font-semibold text-stone-800">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Size & Quantity:</span>
                <span className="text-stone-800">{selectedSize} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Location:</span>
                <span className="text-stone-800">{district} ({address})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-medium text-emerald-700">
                  {district === 'Dhaka' ? '24 - 48 Hours (Dhaka Metro)' : '48 - 72 Hours (Courier Delivery)'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                <span>Total Due on Delivery:</span>
                <span className="text-[#5b1d28]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappConfirmLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Order Checkout Form */
          <div>
            <div className="flex items-center gap-2 text-[#5b1d28] mb-1">
              <Truck className="w-5 h-5" />
              <h3 className="font-serif text-2xl font-bold">Cash on Delivery Checkout</h3>
            </div>
            <p className="text-xs text-stone-500 mb-5">
              Pay in cash only after receiving and inspecting your three-piece outfit at your doorstep.
            </p>

            {/* Product Summary Header */}
            <div className="flex gap-3 p-3 bg-[#fdfaf8] rounded-xl border border-stone-200 mb-5">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-16 h-20 object-cover object-top rounded-lg shrink-0 border border-stone-200"
              />
              <div className="flex flex-col justify-between grow text-xs">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 block">{product.code}</span>
                  <h4 className="font-serif font-bold text-stone-900 line-clamp-1">{product.name}</h4>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Type: <span className="font-medium text-stone-800">{selectedSize}</span> | Qty: <span className="font-medium text-stone-800">{quantity}</span>
                  </p>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-stone-500">Subtotal:</span>
                  <span className="font-bold text-[#5b1d28]">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1" htmlFor="cod-name">
                  Full Recipient Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="cod-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nusrat Jahan"
                    className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden focus:bg-white transition-all ${
                      errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:border-[#5b1d28]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1" htmlFor="cod-phone">
                  Active Mobile Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    id="cod-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01700123456"
                    className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden focus:bg-white transition-all ${
                      errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:border-[#5b1d28]'
                    }`}
                  />
                </div>
                {errors.phone ? (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                ) : (
                  <p className="text-[10px] text-stone-400 mt-1">We will send delivery SMS and call to verify before shipping.</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1" htmlFor="cod-district">
                    Delivery District *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      id="cod-district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#5b1d28] focus:bg-white font-medium cursor-pointer"
                    >
                      {BANGLADESH_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 'Dhaka' ? '(Metro)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Delivery Shipping Rate
                  </label>
                  <div className="py-2 px-3 bg-stone-100 rounded-lg text-stone-700 font-medium flex items-center justify-between">
                    <span>{district === 'Dhaka' ? 'Dhaka Express' : 'Nationwide Courier'}</span>
                    <span className="font-bold text-stone-900">
                      {isFreeDelivery ? 'FREE (Orders ৳5k+)' : district === 'Dhaka' ? '৳ 70' : '৳ 130'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1" htmlFor="cod-address">
                  Full Street Address & Landmark *
                </label>
                <textarea
                  id="cod-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, road number, apartment floor, area landmark..."
                  className={`w-full p-2.5 bg-stone-50 border rounded-lg focus:outline-hidden focus:bg-white transition-all ${
                    errors.address ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:border-[#5b1d28]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1" htmlFor="cod-notes">
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  id="cod-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Call before delivery, deliver in afternoon"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#5b1d28] focus:bg-white"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="pt-2 border-t border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({quantity} {quantity > 1 ? 'items' : 'item'}):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charge:</span>
                  <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Total Due on Delivery (Cash):</span>
                  <span className="text-[#5b1d28] text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-cod-order-btn"
                className="w-full mt-3 py-3 bg-[#5b1d28] hover:bg-[#8a2e3f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Cash on Delivery Order</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
