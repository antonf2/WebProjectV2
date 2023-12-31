import { useState } from "react";
import "./CSS/Card.css";
import { useNavigate } from "react-router-dom";

export const FeauredCard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const handleClick = (index) => {
    setExpanded(index === expanded ? -1 : index);
  };

  const cardData = [
    {
      title: "CreativeDesign Studio",
      description:
        "We're a cutting-edge design agency specializing in branding, web design, and creative marketing solutions. Let us transform your vision into captivating visual experiences.",
      services:
        "Services: Logo design, web development, graphic design, branding strategy.",
      clientele:
        "Clientele: Small businesses, startups, creative professionals.",
      portfolio:
        "Portfolio: View our portfolio of stunning design projects on our website.",
      contact: {
        email: "Email: contact@creativedesignstudio.com",
        phone: "Phone: +1 (555) 123-4567",
        address: "Address: 123 Main Street, Cityville",
      },
    },
    {
      title: "TechWizards Inc.",
      description:
        "Your technology partner for innovation and excellence. We offer custom software development, IT consulting, and digital solutions to drive your business forward.",
      services:
        "Services: Custom software development, IT solutions, cloud computing.",
      expertise:
        "Expertise: Industry-leading tech experts with over a decade of experience.",
      clientele:
        "Clients: Trusted by Fortune 500 companies and startups alike.",
      contact: {
        email: "Email: info@techwizards.com",
        phone: "Phone: +1 (555) 987-6543",
        address: "Address: 456 Tech Boulevard, Techtown",
      },
    },
    {
      title: "Wellness Haven Spa",
      description:
        "Discover tranquility and rejuvenation at Wellness Haven. Our spa offers a range of services, from massages to skincare, designed to nourish your body and soul.",
      services:
        "Services: Massages, facials, body treatments, wellness packages.",
      contact: {
        email: "Email: info@wellnesshaven.com",
        phone: "Phone: +1 (555) 789-0123",
        address: "Address: 789 Serenity Lane, Spaville",
      },
    },
    {
      title: "Gourmet Delights Catering",
      description:
        "Indulge in culinary excellence with Gourmet Delights. We create unforgettable dining experiences with our gourmet catering services for events of all sizes.",
      testimonials:
        "Testimonials: Read what our clients say about their catering experience.",
      contact: {
        email: "Email: catering@gourmetdelights.com",
        phone: "Phone: +1 (555) 234-5678",
        address: "Address: 567 Culinary Court, Feastville",
      },
    },
    {
      title: "GreenTech Solutions",
      description:
        "Committed to a sustainable future, GreenTech Solutions provides eco-friendly products and renewable energy solutions to help you reduce your carbon footprint.",
      products:
        "Products: Solar panels, energy-efficient appliances, sustainable home solutions.",
      initiatives:
        "Eco-Friendly Initiatives: Learn about our commitment to environmental conservation.",
      consultation:
        "Consultation: Schedule a consultation to explore green energy options.",
      contact: {
        email: "Email: info@greentechsolutions.com",
        phone: "Phone: +1 (555) 345-6789",
        address: "Address: 678 Eco Way, Greenburg",
      },
    },
  ];
  return (
    <>
      <section className="py-16 flex flex-col min-h-full bg-zinc-200 bottom z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold">
            Explore Our Featured Cards
          </h2>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-5 items-center">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`mb-4 card h-96 bg-cover bg-center ${
                index === expanded ? "selected" : "w-60"
              }`}
              onClick={() => handleClick(index)}
            >
              <div className="card-content flex flex-col text-center pb-4 font-normal p-2">
                {index !== expanded && (
                  <p className="text-dark-800">{card.description}</p>
                )}
                {index === expanded && (
                  <>
                    <p className="text-dark-800">{card.services}</p>
                    <p className="text-dark-800">{card.clientele}</p>
                    <p className="text-dark-800">{card.portfolio}</p>
                    <p className="text-dark-800">{card.contact.email}</p>
                    <p className="text-dark-800">{card.contact.phone}</p>
                    <p className="text-dark-800">{card.contact.address}</p>
                  </>
                )}
              </div>
              <div className="card-footer rounded-b-3xl bg-opacity-75 justify-center">
                <h2 className="text-xl font-semibold text-center">
                  {card.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose BizSpot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Professionalism</h3>
              <p className="text-gray-700">
                BizSpot helps you create business cards that reflect the utmost
                professionalism. Impress clients and partners with a polished
                and well-designed business card.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-700">
                Our intuitive user interface makes it effortless to create and
                manage your digital business cards. Whether you're tech-savvy or
                new to online tools, you'll find BizSpot's platform easy to
                navigate and use.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Networking</h3>
              <p className="text-gray-700">
                Join our thriving community of professionals. BizSpot isn't just
                about business cards; it's a networking hub. Connect with
                industry experts, potential clients, and collaborators.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center bg-zinc-400 p-10 rounded-t-lg bottom">
        <h2 className="text-2xl font-semibold mb-2">Join Us Today</h2>
        <p className="text-zinc-800">
          Ready to elevate your professional presence and connect with others?
          Join BizSpot today and discover the endless possibilities that await
          you, whether you're a business professional, creative artist, or
          simply passionate about networking and growth.
        </p>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-full text-lg mt-4 inline-block transition duration-300 ease-in-out"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </p>
      </div>
    </>
  );
};
