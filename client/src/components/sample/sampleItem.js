import React from 'react';

const sampleItem = ({type, material, finish, onDelete}) => (
    <div>
        <li>
            {type}: {material}-{finish}
            <button onClick={onDelete}>
                Delete
            </button>
        </li>
    </div>
);

export default sampleItem;