import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
    <div className='min-h-screen flex items-center justify-center'>
        <div className="animate-spin rounded-full h-18 w-18 border-4 border-transparent border-t-4 border-r-4 border-t-gray-900 border-r-gray-900">
        </div>
    </div>
    </>
  )
}

export default LoadingSpinner