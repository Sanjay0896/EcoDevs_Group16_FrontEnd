import React, { useState, useEffect } from "react";

function DropdownMenu({ data, fields, fieldNames, onFiltersChange }) {
  // Initialize the state with all dropdowns closed
  const [uniqueValues, setUniqueValues] = useState({});
  const [selectedFilters, setSelectedFilters] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: [] }), {})
  );

  // Adjusting to use an object for tracking open states of multiple dropdowns
  const [openDropdowns, setOpenDropdowns] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
  );

  useEffect(() => {
    if (fields.length > 0) {
      const initialOpenDropdowns = fields.reduce((acc, field, idx) => {
        acc[field] = idx < 2;
        return acc;
      }, {});

      setOpenDropdowns(initialOpenDropdowns);
    }
  }, []);

  useEffect(() => {
    const newUniqueValues = fields.reduce((acc, field) => {
      acc[field] = Array.from(new Set(data.map((item) => item[field])));
      return acc;
    }, {});
    setUniqueValues(newUniqueValues);
  }, [data, fields]);

  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);

  const toggleDropdown = (field) => {
    setOpenDropdowns(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCheckboxChange = (field, value, isChecked) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (isChecked) {
        updatedFilters[field] = [...updatedFilters[field], value];
      } else {
        updatedFilters[field] = updatedFilters[field].filter((v) => v !== value);
      }
      return updatedFilters;
    });
  };

  const getFieldName = (field) => {
    const fieldObj = fieldNames.find((f) => f.field === field);
    return fieldObj ? fieldObj.name : field;
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 divide-y divide-gray-300 transition duration-300 transform hover:scale-101 hover:shadow-2xl border border-gray-700">
      {fields.map((field, idx) => (
        <div key={field} className={`accordion-item ${idx > 0 ? "pt-4" : ""}`}>
          <h3
            onClick={() => toggleDropdown(field)}
            className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600 flex justify-between items-center"
          >
            {getFieldName(field)}
            <span className="accordion-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 inline-block transform transition-transform ${openDropdowns[field] ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </h3>
          <div
            className={`${openDropdowns[field] ? "block" : "hidden"
              } transition-all duration-500`}
          >
            {uniqueValues[field]?.map((value, index) => (
              <div key={`${field}-${index}`} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${field}-${index}`}
                  name={field}
                  className="form-checkbox h-5 w-5 text-green-600 rounded border border-gray-600 focus:ring-green-500"
                  onChange={(e) =>
                    handleCheckboxChange(field, value, e.target.checked)
                  }
                />
                <label
                  htmlFor={`checkbox-${field}-${index}`}
                  className="ml-2 text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;
