import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { fadeIn, staggerContainer } from "../utils/motion";
import { Store } from "../utils/Store";
import ProductItem from "./ProductItem";

const SectionFive: React.FC = ({ products }): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };
  return (
    <div className="flex flex-col items-center py-5">
      <Image
        src={"/images/lionkinglogo.png"}
        alt={"AOTlogo"}
        width={300}
        height={0}
        className="z-10 items-center m-5 text-center"
      />
      <motion.div
        variants={staggerContainer(0, 5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-5"
      >
        <motion.div
          variants={fadeIn("left", "tween", 0, 1)}
          // className="absolute"
        >
          <Image
            src={"/images/lionking.jpeg"}
            alt={"AOT"}
            width={600}
            height={600}
            // className="items-center text-center translate-x-40 -translate-y-20 rounded-xl"
            className="items-center text-center rounded-xl"
          />
        </motion.div>

        <div className="scale-125">
          {products
            .filter(
              (x) => x.category === "Disney" && x.brand === "POP! Moments"
            )
            .map((product, idx) => (
              <motion.div
                variants={fadeIn("left", "spring", 1 + idx * 0.3, 1.5)}
                whileHover={{ scale: 1.05 }}
                key={idx}
              >
                <ProductItem
                  key={product.slug}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionFive;
