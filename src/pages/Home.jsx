import { useEffect } from "react"

function Home() {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.headline', { 
        duration: 1000,
        distance: '50px', 
        easing: 'ease-in-out',
        origin: 'bottom' 
      })
    }
  }, [])
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.card', { 
        duration: 1000,
        distance: '50px', 
        easing: 'ease-in-out',
        origin: 'bottom' 
      })
    }
  }, [])
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.subheader', { 
        duration: 2000,
        distance: '50px', 
        easing: 'ease-in-out',
        origin: 'left' 
      })
    }
  }, [])
    return (
      <main className='text-slate-900'>
      {/* Landing Art */}
      <div className="headline inline-flex justify-center headline w-full my-4">
        <img src="../media/imgs/Quick Cooks.png" alt="welcome" className="max-h-[33vh] object-cover" />
      </div>
      {/* Subheading */}
      <div className="mb-10 mt-10 text-center subheader">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 mb-6">
          Recipes in 15 Minutes or Less
        </h1>
        <button
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-md text-lg font-medium rounded-full text-white bg-black
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          See Recipes
        </button>
      </div>

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 lg:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 md:flex-shrink-0">
                <img
                  className="w-full h-full min-h-[200px] max-h-screen object-cover"
                  src="../media/imgs/grilled-cheese.jpg"
                  alt="Grilled Cheese"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Grilled Cheese</h3>
                <p className="text-gray-600">
                  A quick and easy recipe for a classic grilled cheese sandwich, perfect for a fast and satisfying meal.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 md:flex-shrink-0">
                <img
                  className="w-full h-full min-h-[200px] max-h-screen object-cover"
                  src="../media/imgs/tomatosoup.JPG"
                  alt="Tomato Soup"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tomato Soup</h3>
                <p className="text-gray-600">
                  A delicious and creamy tomato soup that's quick to make and perfect for pairing with a grilled cheese.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 md:flex-shrink-0">
                <img
                  className="w-full h-full min-h-[200px] max-h-screen object-cover"
                  src="../media/imgs/salad.jpg"
                  alt="Fresh Salad"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cesar Salad</h3>
                <p className="text-gray-600">
                  A vibrant and refreshing salad that's quick to prepare and makes a healthy addition to any meal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-4">"Quick Cooks has transformed my weeknight dinners. The recipes are easy to follow, and the results are delicious!"</p>
              <div className="flex items-center">
                <img src="../media/imgs/steve.png" alt="Person 1" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Steve</p>
                  <p className="text-sm text-gray-500">Coach</p>
                </div>
              </div>
            </div>
            <div className="testimonial bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-4">"The variety of recipes on Quick Cooks is fantastic. I've discovered so many new favorites!"</p>
              <div className="flex items-center">
                <img src="../media/imgs/juliesmith.webp" alt="Person 2" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Julie Smith</p>
                  <p className="text-sm text-gray-500">Food Enthusiast</p>
                </div>
              </div>
            </div>
            <div className="testimonial bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-4">"I love how I can whip up a delicious meal in no time with Quick Cooks. Perfect for busy days!"</p>
              <div className="flex items-center">
                <img src="../media/imgs/dan.jpg" alt="Person 3" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dan </p>
                  <p className="text-sm text-gray-500">Working Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
    )
  }
  
  export default Home
  