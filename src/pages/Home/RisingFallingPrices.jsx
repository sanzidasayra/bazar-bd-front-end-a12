// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCircle} from "react-icons/fa"; 
import { FaCaretSquareUp } from "react-icons/fa";
import tomImg from "../../assets/tom.jpg";
import onionImg from "../../assets/onion.jpg";
import brinjalImg from "../../assets/brinjal.webp";
import cucumberImg from "../../assets/cucumber.jpg";

const sampleData = {
  rising: [
    { name: "Tomato", change: "+৳80/kg", img: tomImg },
    { name: "Onion", change: "+৳50/kg", img: onionImg },
  ],
  falling: [
    { name: "Brinjal", change: "-৳40/kg", img: brinjalImg },
    { name: "Cucumber", change: "-৳30/kg", img: cucumberImg },
  ],
};

const RisingFallingPrices = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      
      <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2">
        <FaCaretSquareUp className="text-blue-500 text-4xl" />
        Rising & Falling Prices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaCircle className="text-green-500 text-xl" />
            <h3 className="text-xl font-semibold text-green-700">
              Top Rising Prices
            </h3>
          </div>
          {sampleData.rising.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-red-600">{item.change}</p>
              </div>
            </div>
          ))}
        </motion.div>

        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaCircle className="text-purple-500 text-xl" />
            <h3 className="text-xl font-semibold text-blue-700">
              Top Falling Prices
            </h3>
          </div>
          {sampleData.falling.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-green-600">{item.change}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RisingFallingPrices;
