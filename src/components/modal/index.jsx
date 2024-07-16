import React from 'react';
import './index.css';

export const Modal = ({ show, handleClose, children }) => { 
  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>&times;</span>
        {children} {/* va permettre de rendre le contenu de la modale dynamique */}
      </div>
    </div>
  );
};


