import { ChevronRight, Mail } from 'lucide-react'
import React from 'react'

function Card() {
  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-white to-teal-50/50 rounded-2xl p-4 border border-teal-100/50 shadow-sm">
    <div className="flex items-start justify-betAween mb-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-teal-50 rounded-full">
          <Mail className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-3xl font-semibold text-gray-900">12</h3>
          <p className="text-gray-600">Active emails</p>
        </div>
      </div>
      <BarChart3 className="h-5 w-5 text-teal-500" />
    </div>

    <div className="border-t border-dashed border-gray-200 pt-4">
      <button className="w-full flex items-center justify-between text-teal-500 hover:text-teal-600 transition-colors">
        <span>View details</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
  )
}

export default Card
