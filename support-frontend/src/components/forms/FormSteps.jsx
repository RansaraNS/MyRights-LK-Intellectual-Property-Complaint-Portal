import React from 'react';

export const FormSteps = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-1 bg-gray-300 -z-10 rounded-full shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#F7374F] via-[#88304E] to-[#522546] transition-all duration-700 ease-out rounded-full shadow-lg"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <div key={step.number} className="flex flex-col items-center relative">
              {/* Step Circle */}
              <div 
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 transform relative overflow-hidden
                  ${isCompleted ? 'bg-gradient-to-br from-[#522546] to-[#2C2C2C] text-white scale-110 shadow-2xl' : ''}
                  ${isActive ? 'bg-gradient-to-br from-[#F7374F] to-[#88304E] text-white scale-125 shadow-2xl shadow-[#F7374F]/30' : ''}
                  ${isUpcoming ? 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 shadow-lg' : ''}
                  before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                `}
              >
                {isCompleted ? (
                  <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="drop-shadow-lg">{step.number}</span>
                )}
                
                {/* Pulse effect for active step */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F7374F] to-[#88304E] animate-ping opacity-75"></div>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-4 text-center min-w-0 w-full max-w-[150px]">
                <h3 className={`
                  text-sm font-bold transition-all duration-300 tracking-wide
                  ${isActive ? 'text-[#F7374F] drop-shadow-sm' : ''}
                  ${isCompleted ? 'text-[#522546] drop-shadow-sm' : ''}
                  ${isUpcoming ? 'text-gray-500' : ''}
                `}>
                  {step.title}
                </h3>
                <p className={`
                  text-xs mt-1 leading-tight font-medium
                  ${isActive ? 'text-[#88304E]' : ''}
                  ${isCompleted ? 'text-[#2C2C2C]' : ''}
                  ${isUpcoming ? 'text-gray-400' : ''}
                `}>
                  {step.description}
                </p>
              </div>

              {/* Active Step Indicator */}
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-gradient-to-br from-[#F7374F] to-[#88304E] rounded-full animate-pulse shadow-lg shadow-[#F7374F]/50"></div>
                </div>
              )}

              {/* Decorative elements */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F7374F]/10 to-[#88304E]/10 rounded-full blur-xl animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};