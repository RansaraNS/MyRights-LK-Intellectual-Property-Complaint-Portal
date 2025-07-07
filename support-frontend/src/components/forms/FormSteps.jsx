import React from 'react';

export const FormSteps = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
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
                  w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 transform
                  ${isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-110' : ''}
                  ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-125 shadow-lg' : ''}
                  ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Step Info */}
              <div className="mt-4 text-center min-w-0 w-full max-w-[150px]">
                <h3 className={`
                  text-sm font-semibold transition-colors duration-300
                  ${isActive ? 'text-blue-600' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${isUpcoming ? 'text-gray-500' : ''}
                `}>
                  {step.title}
                </h3>
                <p className={`
                  text-xs mt-1 leading-tight
                  ${isActive ? 'text-blue-500' : ''}
                  ${isCompleted ? 'text-green-500' : ''}
                  ${isUpcoming ? 'text-gray-400' : ''}
                `}>
                  {step.description}
                </p>
              </div>

              {/* Active Step Indicator */}
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};