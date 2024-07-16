import React, { useState } from 'react';

const FilterTag = ({ isVisible, selectedLandId, onClear }) => {

    if (!isVisible) {
        return null;
    }

    return (
        <div className="flex justify-start items-center p-2">
            {isVisible && (
                <div className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                    <span className="text-sm text-gray-800">Selected Land</span>
                    <span className="bg-white flex items-center rounded-full px-2 py-1 text-sm font-medium text-gray-800 ml-2">
                        {selectedLandId}
                        <button
                            onClick={onClear}
                            className="text-gray-600 ml-2 focus:outline-none"
                        >
                            &times;
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default FilterTag;