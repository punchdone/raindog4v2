import React, { useEffect } from 'react';
import M from 'materialize-css';
import Image from '../../assets/images/IMG_1573.jpeg';
import Image2 from '../../assets/images/IMG_1576.jpg';

const Parallax = () => {

  useEffect(() => {
    let elements = document.querySelectorAll(".parallax");
    M.Parallax.init(elements);
  }, []);

  return (
    <div>
      <div className="parallax-container" style={{height: "300px"}}>
        <div className="parallax"><img className="responsive-img" src={Image} alt="doors" /></div>
      </div>
      <div className="section white">
        <div className="row container">
          <h2 className="header">Raindog v4</h2>
          <p className="grey-text text-darken-3 lighten-3">Our own proprietary online catalog, pricing and order management system.</p>
        </div>
      </div>
      <div className="parallax-container">
        <div className="parallax"><img className="responsive-img" src={Image2} alt="finishes" /></div>
      </div>
    </div>
  );
};

export default Parallax;
