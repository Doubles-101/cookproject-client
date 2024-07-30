import { useEffect } from "react"

function Home() {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.headline', { 
        duration: 2000,
        distance: '50px', 
        easing: 'ease-in-out',
        origin: 'left' 
      })
    }
  }, [])
    return (
      <main className='text-slate-900 pl-10 pr-10'>
        <div className="headline">
          <img src="../media/imgs/SplashArt.png" alt="welcome" />
        </div>
      </main>
    )
  }
  
  export default Home
  