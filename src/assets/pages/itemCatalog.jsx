import React, { useState, useEffect } from 'react';
import NavigationBarSolid from '../elements/navigationBar_solid.jsx';
import { getAllItems, formatPrice } from '../utils/itemsRequests';
import LoaderPopup from '../elements/loader_popup.jsx';

function ItemCatalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupState, setPopupState] = useState({
    show: false,
    status: 'loading',
    message: 'Loading products...'
  });

  useEffect(() => {
    document.title = "Store | Toko Netlab";
    
    const fetchItems = async () => {
      setPopupState({
        show: true,
        status: 'loading',
        message: 'Loading products...'
      });
      
      try {
        const response = await getAllItems();
        
        if (response.success) {
          setItems(response.payload);
          setPopupState({
            show: true,
            status: 'success',
            message: 'Products loaded successfully!'
          });
        } else {
          setError('Failed to fetch items');
          setPopupState({
            show: true,
            status: 'error',
            message: 'Failed to load products'
          });
        }
      } catch (err) {
        setError('An error occurred while fetching data');
        setPopupState({
          show: true,
          status: 'error',
          message: 'An error occurred. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const closePopup = () => {
    setPopupState(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBarSolid />
      
      <LoaderPopup
        show={popupState.show}
        status={popupState.status}
        message={popupState.message}
        onClose={closePopup}
        autoCloseTime={3000}
      />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300?text=Image+Not+Available';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">{item.name}</h2>
                  <p className="text-orange-500 font-bold mt-2">{formatPrice(item.price)}</p>
                  <div className="mt-4">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No products available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCatalog;
