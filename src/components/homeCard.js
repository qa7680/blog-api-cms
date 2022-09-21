import Carousel from 'react-bootstrap/Carousel';
import ApiImage from '../images/api_image.png';
import ClientImage from '../images/client_image.png';
import ServerImage from '../images/server_image.png';

const HomeCard = () => {
    return(
        <div style={{display:'flex', justifyContent: 'center'}}>
            <Carousel style={{margin: '2rem', width: '50%', display: 'flex'}}>
                <Carousel.Item>
                    <img
                        className='d-block w-100 rounded'
                        src={ApiImage}
                        alt='First Slide'
                        style={{width: '30rem', height: '35rem',}}
                    />
                    <Carousel.Caption>
                        <h3>Api Slide</h3>
                        <p>Some information about APIs</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 rounded'
                        src={ClientImage}
                        alt='Second Slide'
                        style={{width: '30rem', height: '35rem'}}
                    />
                    <Carousel.Caption>
                        <h3>Client Slide</h3>
                        <p>Some information about Client side programming</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 rounded'
                        src={ServerImage}
                        alt='Third Slide'
                        style={{width: '30rem', height: '35rem'}}
                    />
                    <Carousel.Caption>
                        <h3>Server Slide</h3>
                        <p>Some information about Server side programming</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCard;