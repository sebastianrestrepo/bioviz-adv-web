import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer class DashMenu extends Component {

    @observable homeBtnSelected: boolean = false;
    @observable projectBtnSelected: boolean = false;
    @observable chatBtnSelected: boolean = false;


    @observable homeBtnOver: boolean = false;
    @observable projectBtnOver: boolean = false;
    @observable chatBtnOver: boolean = false;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<section className="dash-menu">
            <div className="logo">BioViz</div>

            <div className="dash-icon" id="home-icon">
                <button id="home-btn"
                    onClick={() => {
                        this.homeBtnSelected = true;
                        this.projectBtnSelected = false;
                        this.chatBtnSelected = false;
                    }}
                    onMouseOver={() => {
                        this.homeBtnOver = true;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    onMouseOut={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    style={{
                        backgroundColor: this.homeBtnSelected
                            ? '#35E285'
                            : this.homeBtnOver ? '#50445F' : '#282032'
                    }}>
                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M36.6507 17.7573L20.0232 4.32614L19.1005 3.55985C18.7523 3.27062 18.2475 3.27062 17.8994 3.55985L13.1013 7.54444V5.85972C13.1013 5.3405 12.6803 4.91953 12.1612 4.91953H8.5769C8.05776 4.91953 7.63678 5.34058 7.63678 5.85972V12.0661L0.345792 18.0145C-0.0563707 18.3428 -0.116592 18.9349 0.211738 19.3373C0.397682 19.5654 0.668018 19.6832 0.940664 19.6832C1.14962 19.6832 1.3599 19.6139 1.53488 19.4716L4.37906 17.1514V32.7169C4.37906 33.2361 4.79995 33.6571 5.31917 33.6571H15.3662C15.8855 33.6571 16.3064 33.236 16.3064 32.7169V25.4222H20.6935V32.7169C20.6935 33.2361 21.1146 33.6571 21.6338 33.6571H31.6808C32.2001 33.6571 32.621 33.236 32.621 32.7169V16.9198L35.4688 19.2201C35.6427 19.3605 35.8518 19.429 36.0593 19.429C36.3333 19.429 36.6056 19.3096 36.791 19.0796C37.1176 18.6756 37.0546 18.0836 36.6507 17.7573ZM9.51718 6.79992H11.2209V9.04082L9.51718 10.4198V6.79992ZM30.7407 15.6706V31.7765H22.5742V24.4817C22.5742 23.9625 22.1531 23.5416 21.634 23.5416H15.3662C14.8469 23.5416 14.4261 23.9627 14.4261 24.4817V31.7765H6.25953V15.6706L9.9148 12.635C9.9148 12.635 18.4735 5.62214 18.5281 5.52875L30.7407 15.6706Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="37" height="37" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h4>Inicio</h4>
                </button>
            </div>

            <div className="dash-icon" id="analysis-icon">
                <button id="analysis-btn"
                    onClick={() => {
                        this.homeBtnSelected = false;
                        this.projectBtnSelected = true;
                        this.chatBtnSelected = false;
                    }}
                    onMouseOver={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = true;
                        this.chatBtnOver = false;
                    }}
                    onMouseOut={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    style={{
                        backgroundColor: this.projectBtnSelected
                            ? '#35E285'
                            : this.projectBtnOver ? '#50445F' : '#282032'
                    }}>
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9261 2.87506C9.61738 2.87506 2.88184 9.61061 2.88184 17.9194C2.88184 26.2281 9.61738 32.9636 17.9261 32.9636C26.2349 32.9636 32.9704 26.2281 32.9704 17.9194C32.9614 9.61437 26.2311 2.88411 17.9261 2.87506ZM17.9261 4.30785C22.3513 4.31134 26.4981 6.46805 29.0417 10.0892L27.2507 11.8801C26.8149 11.6164 26.3159 11.4753 25.8065 11.4718C24.2239 11.4718 22.9409 12.7548 22.9409 14.3374C22.9434 14.8474 23.0837 15.3471 23.3471 15.7838L18.6561 20.4747C17.7679 19.9331 16.6516 19.9331 15.7633 20.4747L12.5052 17.2166C12.7685 16.7799 12.9089 16.2802 12.9114 15.7702C12.9133 14.1907 11.6346 12.9087 10.0551 12.9067C8.74884 12.9051 7.60754 13.7887 7.28193 15.0538H4.62411C5.98051 8.79007 11.5173 4.31725 17.9261 4.30785ZM27.2393 14.3374C27.2393 15.1287 26.5978 15.7702 25.8065 15.7702C25.0151 15.7702 24.3737 15.1287 24.3737 14.3374C24.3737 13.546 25.0151 12.9046 25.8065 12.9046C26.5978 12.9046 27.2393 13.546 27.2393 14.3374ZM18.6425 22.9341C18.6425 23.7255 18.0011 24.3669 17.2097 24.3669C16.4184 24.3669 15.7769 23.7255 15.7769 22.9341C15.7769 22.1428 16.4184 21.5013 17.2097 21.5013C18.0011 21.5013 18.6425 22.1428 18.6425 22.9341ZM11.4786 15.7702C11.4786 16.5615 10.8371 17.203 10.0458 17.203C9.25444 17.203 8.613 16.5615 8.613 15.7702C8.613 14.9788 9.25444 14.3374 10.0458 14.3374C10.8371 14.3374 11.4786 14.9788 11.4786 15.7702ZM24.5397 29.821C22.5166 30.9443 20.2403 31.5328 17.9261 31.5308C10.4138 31.5359 4.31973 25.4502 4.31463 17.9379C4.31427 17.4531 4.33988 16.9685 4.39128 16.4865H7.28193C7.60762 17.7478 8.74311 18.6307 10.0458 18.6357C10.5558 18.6332 11.0555 18.4928 11.4922 18.2295L14.7504 21.4876C14.487 21.9243 14.3467 22.424 14.3442 22.934C14.3442 24.5166 15.6271 25.7996 17.2097 25.7996C18.7923 25.7996 20.0753 24.5166 20.0753 22.934C20.0728 22.424 19.9325 21.9243 19.6691 21.4876L24.3601 16.7967C24.7967 17.06 25.2965 17.2004 25.8065 17.2029C27.3891 17.2029 28.6721 15.9199 28.6721 14.3373C28.6695 13.8273 28.5292 13.3275 28.2659 12.8909L29.8276 11.3299C33.4736 17.8963 31.1061 26.1751 24.5397 29.821Z" fill="white" />
                        <path d="M35.836 7.17354C37.1387 7.16862 38.2742 6.28575 38.5999 5.02436H43V3.59157H38.5999C38.2742 2.33018 37.1387 1.44731 35.836 1.44238C34.2534 1.44238 32.9704 2.72536 32.9704 4.30796C32.9729 4.81795 33.1133 5.31772 33.3766 5.75436L32.1179 7.01307C26.0953 -0.833333 14.8522 -2.31179 7.00578 3.71085C-0.840627 9.73349 -2.31909 20.9767 3.70356 28.8231C9.38851 36.2294 19.8095 38.0261 27.6462 32.9509L29.8083 35.1129L30.8213 36.1259L36.5882 41.8929C38.055 43.3596 40.4329 43.3596 41.8996 41.8929C43.3663 40.4262 43.3663 38.0483 41.8996 36.5816L36.1326 30.8146L35.1196 29.8016L32.9575 27.6395C36.7955 21.7278 36.7955 14.1112 32.9575 8.19942L34.3903 6.76663C34.8267 7.03008 35.3263 7.17068 35.836 7.17354ZM35.836 2.87517C36.6274 2.87517 37.2688 3.51662 37.2688 4.30796C37.2688 5.09931 36.6274 5.74075 35.836 5.74075C35.0447 5.74075 34.4032 5.09931 34.4032 4.30796C34.4032 3.51662 35.0448 2.87517 35.836 2.87517ZM40.8866 37.5945C41.8041 38.4915 41.8209 39.9624 40.9239 40.8799C40.027 41.7974 38.5561 41.8142 37.6386 40.9173C37.6259 40.905 37.6136 40.8925 37.6012 40.8799L31.8342 35.1129L35.1196 31.8276L40.8866 37.5945ZM34.1066 30.8146L30.8213 34.1L28.8383 32.117C28.9393 32.0396 29.0339 31.9544 29.1334 31.8748C29.233 31.7953 29.3483 31.7 29.4551 31.6105C29.612 31.4787 29.7667 31.3454 29.9186 31.2086C29.9967 31.137 30.0712 31.0653 30.1478 30.9937C30.4416 30.7186 30.726 30.4342 31.0011 30.1404C31.0727 30.0638 31.1444 29.9893 31.216 29.9112C31.3528 29.7593 31.4861 29.6046 31.6179 29.4477C31.7077 29.3417 31.7958 29.2345 31.8822 29.126C31.961 29.0272 32.0463 28.9326 32.1237 28.8316L34.1066 30.8146ZM31.3285 27.4869C31.1028 27.8021 30.87 28.1109 30.6242 28.4082C30.5526 28.4949 30.476 28.5787 30.4022 28.664C30.1829 28.919 29.9566 29.1664 29.723 29.4061C29.6213 29.5112 29.5179 29.6146 29.4128 29.7163C29.174 29.9499 28.9267 30.1763 28.6706 30.3955C28.5854 30.4671 28.5016 30.5452 28.4149 30.6176C28.1176 30.8633 27.8088 31.0961 27.4936 31.3218C20.0775 36.62 9.77044 34.903 4.47225 27.4869C-0.825941 20.0708 0.890989 9.76376 8.30711 4.46557C15.7232 -0.832617 26.0303 0.884223 31.3285 8.30043C35.4281 14.0389 35.4281 21.7484 31.3285 27.4869Z" fill="white" />
                    </svg>
                    <h4>Proyectos</h4>
                </button>
            </div>

            <div className="dash-icon" id="chat-icon">
                <button id="chat-btn"
                    onClick={() => {
                        this.homeBtnSelected = false;
                        this.projectBtnSelected = false;
                        this.chatBtnSelected = true;
                    }}
                    onMouseOver={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = true;
                    }}
                    onMouseOut={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    style={{
                        backgroundColor: this.chatBtnSelected
                            ? '#35E285'
                            : this.chatBtnOver ? '#50445F' : '#282032'
                    }}>
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.2666 4.26288H2.42136C1.08617 4.26288 0 5.34905 0 6.68415V23.9897C0 25.3248 1.08617 26.411 2.42136 26.411H4.29178V32.8535C4.29178 33.2637 4.53886 33.6336 4.91797 33.7907C5.04344 33.8427 5.1753 33.8679 5.30598 33.8679C5.57002 33.8679 5.82937 33.7648 6.02346 33.5708L13.1832 26.4111H14.6197C15.18 26.4111 15.6341 25.957 15.6341 25.3967C15.6341 24.8364 15.1798 24.3823 14.6197 24.3823C14.6197 24.3823 12.7141 24.3836 12.6942 24.3857C12.458 24.4017 12.2262 24.499 12.0457 24.6794L6.32051 30.4046C6.32051 30.4046 6.31874 25.3326 6.31547 25.3063C6.2697 24.7884 5.83533 24.3823 5.30564 24.3823H2.42136C2.20485 24.3823 2.02881 24.2062 2.02881 23.9898V6.68415C2.02881 6.46764 2.20493 6.29161 2.42136 6.29161H31.2666C31.4831 6.29161 31.6591 6.46772 31.6591 6.68415V13.3236C31.6591 13.8838 32.1134 14.3379 32.6735 14.3379C33.2336 14.3379 33.6879 13.8838 33.6879 13.3236V6.68415C33.6879 5.34905 32.6017 4.26288 31.2666 4.26288Z" fill="white" />
                        <path d="M40.5783 16.6703H20.3872C19.0521 16.6703 17.9658 17.7565 17.9658 19.0916V30.8974C17.9658 32.2325 19.052 33.3187 20.3872 33.3187H33.028L38.1494 38.4401C38.3435 38.6342 38.6029 38.7372 38.8669 38.7372C38.9976 38.7372 39.1294 38.7119 39.2549 38.66C39.6338 38.5029 39.8811 38.1331 39.8811 37.7228V33.3186H40.5782C41.9133 33.3186 42.9996 32.2325 42.9996 30.8973V19.0916C42.9997 17.7565 41.9135 16.6703 40.5783 16.6703ZM40.9709 30.8974C40.9709 31.1138 40.7948 31.2899 40.5784 31.2899H38.8671C38.3333 31.2899 37.8968 31.7024 37.8567 32.2261C37.8541 32.2482 37.8524 35.2739 37.8524 35.2739L34.1694 31.5907C34.1655 31.5869 34.1615 31.5833 34.1576 31.5794C34.1432 31.5653 34.1295 31.553 34.1165 31.542C33.938 31.3855 33.7048 31.2898 33.4488 31.2898H20.3872C20.1707 31.2898 19.9946 31.1137 19.9946 30.8973V19.0916C19.9946 18.875 20.1707 18.699 20.3872 18.699H40.5784C40.7948 18.699 40.9709 18.8751 40.9709 19.0916V30.8974V30.8974Z" fill="white" />
                        <path d="M30.4831 23.9801C29.9232 23.9801 29.4688 24.4345 29.4688 24.9945C29.4688 25.5544 29.9232 26.0088 30.4831 26.0088C31.0431 26.0088 31.4975 25.5544 31.4975 24.9945C31.4975 24.4345 31.043 23.9801 30.4831 23.9801Z" fill="white" />
                        <path d="M26.0746 10.9693H7.613C7.05282 10.9693 6.59863 11.4234 6.59863 11.9837C6.59863 12.5439 7.05291 12.998 7.613 12.998H26.0746C26.6348 12.998 27.089 12.5439 27.089 11.9837C27.089 11.4234 26.6348 10.9693 26.0746 10.9693Z" fill="white" />
                        <path d="M14.6194 17.6758H7.613C7.05282 17.6758 6.59863 18.1299 6.59863 18.6901C6.59863 19.2504 7.05291 19.7045 7.613 19.7045H14.6194C15.1797 19.7045 15.6338 19.2504 15.6338 18.6901C15.6338 18.1299 15.1796 17.6758 14.6194 17.6758Z" fill="white" />
                        <path d="M25.7692 23.9801C25.2094 23.9801 24.7549 24.4345 24.7549 24.9945C24.7549 25.5544 25.2094 26.0088 25.7692 26.0088C26.3293 26.0088 26.7836 25.5544 26.7836 24.9945C26.7836 24.4345 26.3293 23.9801 25.7692 23.9801Z" fill="white" />
                        <path d="M35.196 23.9801C34.6361 23.9801 34.1816 24.4345 34.1816 24.9945C34.1816 25.5544 34.6361 26.0088 35.196 26.0088C35.756 26.0088 36.2104 25.5544 36.2104 24.9945C36.2104 24.4345 35.7559 23.9801 35.196 23.9801Z" fill="white" />
                    </svg>
                    <h4>Chat</h4>
                </button>
            </div>

        </section>);
    }
}

export default DashMenu;