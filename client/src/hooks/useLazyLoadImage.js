import main from "components/MainPage/Recipe.module.scss";
import detail from "components/RecipeDetail/RecipeDetail.module.scss";
import post from "components/PostList/PostList.module.scss";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { useSelector } from "react-redux";
import { theme } from "store/slice/themeSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderLight from "asset/placeholder-src-dark.png";
import placeholderDark from "asset/placeholder-src-light.png";

const useLazyLoadImage = () => {
  const isDark = useSelector(theme);

  const className = key => {
    if (key === "recipe_main") {
      return main.image;
    } else if (key === "recipe_detail") {
      return detail.image;
    } else if (key === "post_detail") {
      return post.image;
    }
  };

  const lazyLoadImage = (
    params = null,
    menualImage = null,
    menualOrders = null
  ) => {
    const { key, image, width, height, order } = params;

    return (
      <LazyLoadImage
        className={className(key)}
        style={{ transition: "all 0.3s ease-in-out" }}
        src={image || menualImage}
        placeholderSrc={isDark ? placeholderLight : placeholderDark}
        effect="black-and-white"
        threshold={100}
        delayTime={200}
        delayMethod="throttle"
        width={width || 400}
        height={height || 250}
        alt={order || menualOrders}
      />
    );
  };
  return { lazyLoadImage };
};

export default useLazyLoadImage;
