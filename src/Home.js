import React from 'react';
import Product from './Product';
import './Home.css';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

function Home() {
  const slideImages = [
    {
      url: 'https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg',  
      caption: 'Slide 1'
    },
    {
      url: 'https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg',
      caption: 'Slide 2'
    },
    {
      url: 'https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg',
      caption: 'Slide 3'
    },
    {
      url: 'https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg',
      caption: 'Slide 4'
    },
  ];
  return (
    <div className="home">
        <div className="home-container">
            <Slide>
              {slideImages.map((slideImage, index)=> (
                <div className="home-banner" key={index}>
                  <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                  </div>
                </div>
              ))} 
            </Slide>
        </div>
        <div className="home-row">
        <Product
          id="14567892"
          title="Echo (4th Gen, 2020 release) | Premium sound powered by Dolby and Alexa (Blue)"
          price={6999}
          image="https://m.media-amazon.com/images/I/61NIsUGl+FL.jpg"
          rating={5}
        />
        <Product
        id="94568732" 
          title="Lakmé Absolute Spotlight Eye Shadow Palette, Berry Martini, 12 g"
          price={696}
          image="https://m.media-amazon.com/images/I/71hhlMS4CWL._SL1000_.jpg"
          rating={4}
        />
        <Product
          id="74267892"
          title="Little's Junior Ring (Plastic,Multicolour)"
          price={162}
          image="https://m.media-amazon.com/images/I/61ZUgvynAEL._SL1000_.jpg"
          rating={5}
        />
        <Product 
          id="18924567"
          title="PowerA Enhanced Wired Gaming Controller for Xbox Series X/S, Pink (Officially Licensed)"
          price={3599}
          image="https://m.media-amazon.com/images/I/71sZH92bM0L._SL1500_.jpg"
          rating={4}
        />
        </div>
        <div className="home-row">
        <Product
          id="51836029"
          title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
          price={135990}
          image="https://m.media-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg"
          rating={4} 
        />
        <Product 
          id="43917729"
          title="Karigaari India Wall Decorative Iron Flowers (Multicolour)"
          price={2400}
          image="https://m.media-amazon.com/images/I/71VO++RTB9L._SL1500_.jpg"
          rating={4}
        />
        </div>
        <div className="home-row">
        <Product 
          id="57000029"
          title="ASUS VivoBook Flip 14 (2020), Intel Core i3-10110U 10th Gen, 14 inches, (35.56cms) FHD Touch, 2-in-1 Laptop (8GB/256GB SSD/Office 2019/Windows 10/Integrated Graphics/Blue/1.5 kg), TP412FA-EC382TS"
          price={51500}
          image="https://m.media-amazon.com/images/I/71C-YpFn0zS._SL1500_.jpg"
          rating={4}
        />
        <Product 
          id="13372029"
          title="The Complete Novels of Sherlock Holmes Paperback – 10 January 2017"
          price={139}
          image="https://images-na.ssl-images-amazon.com/images/I/81StezluKUS.jpg"
          rating={4}
        />
        <Product
          id="39281756" 
          title="Walkent Ritzy 15.6 inches Waterproof Laptop Bag - Hi-Quality PU, Anti Theft Design, External USB, Scratch Resistant"
          price={2490}
          image="https://m.media-amazon.com/images/I/51RFjEDdrlL._UL1200_.jpg"
          rating={4}
        />
        </div>
    </div>
  )
}

export default Home