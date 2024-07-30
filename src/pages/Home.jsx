import { useEffect } from "react"

function Home() {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.headline', { 
        duration: 1000,
        distance: '50px', 
        easing: 'ease-in-out',
        origin: 'left' 
      })
    }
  }, [])
    return (
      <main className='text-slate-900'>
        <div className="headline w-full">
          <img src="../media/imgs/SplashArt.png" alt="welcome" className="w-full" />
        </div>
      </main>
    )
  }
  
  export default Home
  