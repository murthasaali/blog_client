import React from 'react';

function HomeCarousal() {
    const images = [
        'https://www.google.com/chrome/static/images/dev-components/chrome-gallery-2-2x.webp',
        'https://www.google.com/chrome/static/images/dev-components/chrome-gallery-3-2x.webp',
        'https://www.google.com/chrome/static/images/dev-components/chrome-gallery-4-2x.webp',
        'https://www.google.com/chrome/static/images/dev-components/chrome-gallery-5-2x.webp'
    ];

    return (
        <div className='w-max h-full flex gap-10'>
            {images.map((item, index) => (
                <img 
                    key={index} 
                    src={item} 
                    alt="" 
                    className={`h-auto w-auto shadow-md rounded-xl  opacity-90 ${index % 2 !== 0 ? 'odd-index' : ''}`} 
                />
            ))}
        </div>
    );
}

export default HomeCarousal;
