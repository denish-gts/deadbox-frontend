import React, {  useEffect, useState } from 'react'
import Slider from "react-slick";
import styles from "./PeFirms.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { get } from '@/api/base';
import { errorCheckAPIResponse } from '@/utils/helpers';

const Logo = "/assets/images/logo1.png";
const GridIcon = "/assets/icons/grid-icon.svg";
const InvestmentIcon = "/assets/icons/investment-icon.svg";
const SectoreIcon = "/assets/icons/sectore-icon.svg";
const GeographicalIcon = "/assets/icons/Geographical-icon.svg";

const SliderRIghtArrow = "/assets/icons/right-side-arrow.svg";
const SliderLeftArrow = "/assets/icons/left-side-arrow.svg";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={styles.nextArrowALignment}
            onClick={onClick}
        >
            <Image unoptimized height={0} width={0} src={SliderRIghtArrow} alt="SliderRIghtArrow" />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={styles.prevArrowALignment}
            onClick={onClick}
        >
            <Image unoptimized height={0} width={0} src={SliderLeftArrow} alt="SliderLeftArrow" />
        </div>
    );
}
export default function PeFirms() {
    const router = useRouter()
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
                    dots: false
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                initialSlide: 1,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [PEFirmData, setPEFirmData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        get(`/dashboard/api/companies`).then((res) => {
            const response = res?.data?.results
            setPEFirmData(response)
            setIsLoading(false)
        }).catch((error) => {
            errorCheckAPIResponse(error)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className={styles.peFirmsSection}>
            <div className={styles.peFirmsBox}>
                <div className={styles.peFirmsHeading}>

                    <h2>PE Firms</h2>

                    <div className={styles.viewAllPeFIrms} onClick={() => router.push('/firm-list')}>
                        <Image unoptimized height={0} width={0} src={GridIcon} alt='GridIcon' />
                        <p>View All PE Firms</p>
                    </div>
                </div>

                <div className={styles.peFirmDetailsAlignment}>
                    <Slider {...settings}>
                        {PEFirmData.map((firm, key) => {
                            return (
                                <div className={styles.peFirmDetailsSlider} key={key} onClick={() => {
                                    router.push(`/firm/${firm?.organization_name}`)
                                }}>
                                    <div className={styles.peFirmDetailsBOx}>
                                        <div className={styles.peFirmDetailsLogo}>
                                            {/* <h3>{firm?.logo_url}</h3> */}

                                            <Image unoptimized height={60} width={60} src={firm?.logo_url} alt="Logo" />
                                        </div>

                                        <div className={styles.peFirmDetailAllDetails}>
                                            <div className={styles.peFirmProfileDescription}>

                                                <h3>{firm?.organization_name}</h3>
                                                <p>{firm?.full_description} </p>
                                            </div>

                                            <div className={styles.peFirmProfileBottomAlignment}>
                                                <div className={styles.peFirmListDetails}>
                                                    <Image unoptimized height={0} width={0} src={InvestmentIcon} alt='InvestmentIcon' />
                                                    <p>Total Investments - <span>{firm['last_equity_funding_amount_(in_usd)'] ? `${firm['last_equity_funding_amount_(in_usd)']?.toLocaleString('en-US')}` : 0}</span> </p>
                                                </div>
                                                <div className={styles.peFirmListDetails}>
                                                    <Image unoptimized height={0} width={0} src={SectoreIcon} alt='SectoreIcon' />
                                                    <p>Sectors - <span>{firm?.industries?.split(',').length}</span> </p>
                                                </div>
                                                <div className={styles.peFirmListDetails}>
                                                    <Image unoptimized height={0} width={0} src={GeographicalIcon} alt='GeographicalIcon' />
                                                    <p>Geographical Focus - <span>Global</span> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
