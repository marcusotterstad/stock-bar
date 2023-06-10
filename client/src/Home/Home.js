import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import menu_page_drinks from './menu_page_drinks.jpg';

const Home = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm">
                    <h2>Welcome to My Dynamic Drink Ordering App</h2>
                    <p>This application is designed to offer a unique experience for ordering drinks at your favorite bar or restaurant. I believe ordering drinks should be as dynamic and lively as the atmosphere around you. Hence, I have implemented an innovative pricing system where drink prices change every 5 minutes, just like a stock market!</p>
                </div>
                <div className="col-sm">
                    <img className='img-fluid' src={menu_page_drinks} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <h3>Real-time Pricing</h3>
                    <p>Our app allows you to keep track of your favorite drink prices in real time. You can monitor price changes and place your order when the price drops to your liking!</p>
                </div>
                <div className="col-sm">
                    <h3>Order Tracking</h3>
                    <p>Track your orders with ease. The system notifies you once your order is fulfilled. You can also view all your unfulfilled orders anytime.</p>
                </div>
                <div className="col-sm">
                    <h3>Future Plans</h3>
                    <p>I aim to integrate AI into my system for automated stress testing and more. I also plan to introduce a visual stock market style representation of my pricing system and a dedicated employee client for efficient order completion.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
