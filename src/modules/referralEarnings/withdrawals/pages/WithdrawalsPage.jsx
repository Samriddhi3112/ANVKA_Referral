import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav/Sidenav';
import Header from './header/Header';
import Modal from 'react-bootstrap/Modal';
import fundSuccessImg from '../../assets/images/fundsuccess.svg'
import { MdKeyboardArrowRight } from 'react-icons/md';


const initialState = {
    fundSuccess: false
}

const WithdrawMoney = () => {
    const [cState, updateCstate] = useState(initialState);
        const { fundSuccess } = cState;
        const handleFundShow = () => {
            updateCstate({
                ...cState,
                fundSuccess: true
            })
        }
        const handleFundClose = () => {
            updateCstate({
                ...cState,
                fundSuccess: false
            })
        }
    return (
        <>
            <Sidenav />
            <Header />
            <div className="WrapperArea">
                <div className="WrapperBox">
                    <div className="TitleBox">
                        <h4 className='Title'>My Balance</h4>
                        <div class="totalEarning"><p className='mb-0'>Total Earning</p><h2>$20,000.00</h2></div>
                        
                    </div>
                    <div className='advisorBox'>

                        <p>Available Balance</p>
                        <h3>$ 215.00</h3>
                    </div>
                    <div className="commonForm">
                        <form>
                            <div className="form-group">
                                <h6>Add Amount</h6>
                                <input type="text" className='form-control' />
                            </div>
                        </form>
                        <Link className="withdrawBtn" onClick={handleFundShow}>Continue</Link>
                    </div>
                    {/* <div className='Paginations'>
                        <label>&nbsp;</label>
                        <ul>
                            <li><a href="javascript:void(0);" className='active'>1</a></li>
                            <li><a href="javascript:void(0);">2</a></li>
                            <li><a href="javascript:void(0);">3</a></li>
                            <li><a href="javascript:void(0);">4</a></li>
                            <li><a href="javascript:void(0);">5</a></li>
                        </ul>
                        <button className='nextBtn'>Next <MdKeyboardArrowRight /></button>
                    </div> */}
                </div>
            </div>
            <Modal show={fundSuccess} onHide={handleFundClose}>
                <Modal.Body>
                    <div className="fundSuccessFullyArea">
                        <span><img src={fundSuccessImg} alt="img" /></span>
                        <h4>Withdrawal Successfully</h4>
                        <p>#Transaction ID: 123816481646090<br />
                            Your Payment will be processed successfully with 24-48 hours.</p>
                        <Link className='homeBtn' onClick={handleFundClose} to="/referral-earnings" >Home</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WithdrawMoney;