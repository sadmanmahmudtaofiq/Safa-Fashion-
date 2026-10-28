import React from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-[#5b1d28] mb-4">
          <Ruler className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold">Three-Piece Size & Fabric Guide</h3>
        </div>

        <p className="text-xs text-stone-600 mb-5 leading-relaxed">
          All our three-piece sets are provided with generous fabric allowances to accommodate custom tailoring up to size 46+. Stitched ready-to-wear options follow standard subcontinental designer measurements.
        </p>

        {/* Unstitched Breakdown */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2.5 pb-1 border-b border-stone-200">
            Unstitched 3-Piece Fabric Cut
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#fcf7f5] p-3 rounded-lg border border-stone-200/80">
              <span className="block font-bold text-stone-800">Kameez / Shirt</span>
              <span className="text-stone-500 mt-1 block">3.00 Meters</span>
            </div>
            <div className="bg-[#fcf7f5] p-3 rounded-lg border border-stone-200/80">
              <span className="block font-bold text-stone-800">Dupatta / Orna</span>
              <span className="text-stone-500 mt-1 block">2.50 Meters</span>
            </div>
            <div className="bg-[#fcf7f5] p-3 rounded-lg border border-stone-200/80">
              <span className="block font-bold text-stone-800">Salwar / Pants</span>
              <span className="text-stone-500 mt-1 block">2.50 Meters</span>
            </div>
          </div>
        </div>

        {/* Stitched Measurements Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2.5 pb-1 border-b border-stone-200">
            Stitched Ready-to-Wear Chart (Inches)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700">
                  <th className="p-2.5 font-semibold">Size</th>
                  <th className="p-2.5 font-semibold">Chest / Bust</th>
                  <th className="p-2.5 font-semibold">Waist</th>
                  <th className="p-2.5 font-semibold">Hips</th>
                  <th className="p-2.5 font-semibold">Kameez Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">Small (S)</td>
                  <td className="p-2.5">36" - 38"</td>
                  <td className="p-2.5">32" - 34"</td>
                  <td className="p-2.5">38" - 40"</td>
                  <td className="p-2.5">44"</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-2.5 font-bold text-stone-900">Medium (M)</td>
                  <td className="p-2.5">39" - 40"</td>
                  <td className="p-2.5">35" - 36"</td>
                  <td className="p-2.5">41" - 42"</td>
                  <td className="p-2.5">44"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">Large (L)</td>
                  <td className="p-2.5">42"</td>
                  <td className="p-2.5">38"</td>
                  <td className="p-2.5">44"</td>
                  <td className="p-2.5">45"</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-2.5 font-bold text-stone-900">Extra Large (XL)</td>
                  <td className="p-2.5">44"</td>
                  <td className="p-2.5">40"</td>
                  <td className="p-2.5">46"</td>
                  <td className="p-2.5">45"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-[#5b1d28] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
