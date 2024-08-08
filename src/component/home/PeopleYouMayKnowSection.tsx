import styles from "./home.module.scss";
import people1 from "../../../public/assets/images/people1.png";
import people2 from "../../../public/assets/images/people2.png";
import people3 from "../../../public/assets/images/people3.png";
import people4 from "../../../public/assets/images/people4.png";
import people5 from "../../../public/assets/images/people5.png";
import Image from "next/image";
import Slider from "react-slick";

const SliderRIghtArrow = "../../../public/assets/images/logout.svg";
const SliderLeftArrow = "../../../public/assets/images/left-side-arrow.svg";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div className={styles.nextArrowALignment} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="angle-small-down 1" opacity="0.6">
          <g id="01 align center">
            <path
              id="Vector"
              d="M8.49997 12C8.49951 11.7374 8.55096 11.4773 8.65135 11.2346C8.75174 10.992 8.89911 10.7716 9.08497 10.586L14.379 5.29303L15.793 6.70703L10.5 12L15.793 17.293L14.379 18.707L9.08597 13.414C8.89993 13.2286 8.75238 13.0082 8.65181 12.7655C8.55125 12.5229 8.49964 12.2627 8.49997 12Z"
              fill="#282929"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={styles.prevArrowALignment} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="angle-small-down 2" opacity="0.6">
          <g id="01 align center">
            <path
              id="Vector"
              d="M15.5 12C15.5005 11.7374 15.449 11.4773 15.3486 11.2346C15.2483 10.992 15.1009 10.7716 14.915 10.586L9.62103 5.29303L8.20703 6.70703L13.5 12L8.20703 17.293L9.62103 18.707L14.914 13.414C15.1001 13.2286 15.2476 13.0082 15.3482 12.7655C15.4488 12.5229 15.5004 12.2627 15.5 12Z"
              fill="#282929"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
const PeopleYouMayKnowSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        initialSlide: 1,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">

      <div className={styles.peopleYouMayKnowSection}>
        <div className={styles.header}>
          <h3>People you may know</h3>
          <a href="#" className={styles.viewAll}>
            VIEW ALL
          </a>
        </div>
        <p>Explore peoples you might be interested in.</p>
        <div className={styles.sliderBox}>
          <Slider {...settings}>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.main}>
                <div className={styles.itemsBox}>
                  <div className={styles.centerImage}>
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      src={people1}
                      alt="people1"
                    />
                  </div>
                  <div className={styles.spacer}>
                    <p>Jane Cooper</p>
                    <span>Unitad Status</span>
                    <div className={styles.btnCenter}>
                      <button>Add To Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleYouMayKnowSection;
