import Link from "next/link"
export default function Footer (){
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link href='/sign-up'>How it works</Link>
                            <Link href='/'>Testimonials</Link>
                            <Link href='/'>Careers</Link>
                            <Link href='/'>Investors</Link>
                            <Link href='/'>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}
