import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function Dropdownbox({title,items}) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}>
            <DropdownButton id="dropdown-basic-button" title={title} style={{
                color: 'white',
                borderRadius: '5px',
                padding: '8px 16px',
                fontWeight: 'bold',
            }} show={showDropdown}>
                <div style={{ backgroundColor: "black", borderRadius: '20px' }}>
                    {items.map((item, index) => (
                        <Dropdown.Item key={index} style={index === 0 ? { borderLeft: '20px' } : index === items.length - 1 ? { borderRight: '20px' } : { border: '0px' }}>
                            {item}
                        </Dropdown.Item>
                    ))}
                </div>
            </DropdownButton>
        </div>
    );
}

export default Dropdownbox;
