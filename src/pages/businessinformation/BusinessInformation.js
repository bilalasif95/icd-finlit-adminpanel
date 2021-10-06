import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import NumericLabel from 'react-pretty-numbers';
import Widget from "../../components/Widget/Widget";
import Switch from "@material-ui/core/Switch";
import noPhoto from "../../images/noPhoto.png";
import { Redirect } from "react-router-dom";
import { firebase, table } from "../../config";
import Dailog from "../../components/Basic-component/Dailog";
import { Close as AddIcon } from "@material-ui/icons";
import Camera from "../../images/zoom_in-24px-svg.svg";

export default function BusinessInformationPage({ location }) {
  var classes = useStyles();
  const [balance, setBalance] = useState({
    usd: "0",
    gbp: "0",
    eur: "0",
  });
  const [businessData, setBusinessData] = useState({});
  const [imageModal, setImageModal] = useState(false);
  const { query } = location || '';
  useEffect(() => {
    if (!!query) {
      getBusinessBalance(query.uid);
      getBusinessData(query.uid);
    }
  }, []);
  const getBusinessBalance = id => {
    firebase
      .firestore()
      .collection(table.Accounts)
      .doc(id)
      .collection(table.balances)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(doc => {
          setBalance(prevBalance => ({
            ...prevBalance,
            [doc.doc.data().currency]: doc.doc.data().available,
          }));
        });
      });
  };
  const getBusinessData = id => {
    firebase
      .firestore()
      .collection(table.Businesses)
      .doc(id)
      .onSnapshot(doc => {
        setBusinessData(doc.data());
      });
  };
  if (!!query) {
    let data = { ...query };
    return (
      <>
        <Widget disableWidgetMenu>
          <div className={classes.title}>Business Information</div>
          <div className={classes.custInfo}>
            <div className={classes.balanceList}>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>USD Balance</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >{balance.usd}</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>GBP Balance</p>
                <h4 className={classes.bal}>£<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >{balance.gbp}</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>EUR Balance</p>
                <h4 className={classes.bal}>€<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >{balance.eur}</NumericLabel></h4>
              </div>
            </div>
            <div className={classes.inForm}>
              <div className={classes.form}>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>First Name</div>
                    <div className={classes.showRes}>{data.firstName}</div>
                  </div>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Last Name</div>
                    <div className={classes.showRes}>{data.lastName}</div>
                  </div>
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Contact No. </div>
                    <div className={classes.showRes}>{data.phone}</div>
                  </div>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Email</div>
                    <div className={classes.showRes}>{data.email}</div>
                  </div>
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>
                      Business Name (Enter legal business name)
                    </div>
                    <div className={classes.showRes}>
                      {businessData && businessData.businessName}
                    </div>
                  </div>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Company ID Number</div>
                    <div className={classes.showRes}>
                      {businessData && businessData.businessID}
                    </div>
                  </div>
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>
                      Country of Business Registration
                    </div>
                    <div className={classes.showRes}>
                      {businessData && businessData.countryofRegisteration &&
                        businessData.countryofRegisteration.label}
                    </div>
                  </div>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>City</div>
                    <div className={classes.showRes}>{businessData && businessData.city}</div>
                  </div>
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Address Line 1</div>
                    <div className={classes.showRes}>
                      {businessData && businessData.address1}
                    </div>
                  </div>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Address Line 2</div>
                    <div className={classes.showRes}>
                      {businessData && businessData.address2}
                    </div>
                  </div>
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.fieldCont}>
                    <div className={classes.label}>Postcode/Zipcode</div>
                    <div className={classes.showRes}>
                      {businessData && businessData.postcode}
                    </div>
                  </div>
                  <div className={classes.toggle}>
                    <div>
                      <div className={classes.label}>KYC Status</div>
                      <Switch checked={data.kycVerified} />
                    </div>
                    <div>
                      <div className={classes.label}>Charity Status</div>
                      {businessData && businessData.isCharity && <Switch checked={true} />}
                      {businessData && !businessData.isCharity && <Switch checked={false} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.charityInfo}>
            <div className={classes.charItem}>
              <div className={classes.label}>Description</div>
              <div className={classes.descriptionRes}>{businessData.description}</div>
            </div>
            <div className={classes.charItem}>
              <div className={classes.label}>Slogan</div>
              <div className={classes.res}>{businessData.shortIntro}</div>
              <div>
                <div className={classes.charSubItem}>
                  <div className={classes.charItem}>
                    <div className={classes.label}>Profile Photo</div>
                    <div className={classes.photo}>
                      {businessData.businessLogo ?
                        <img
                          src={businessData.businessLogo}
                          alt={businessData.businessName}
                          className={classes.imgIcon}
                        />
                        :
                        <img src={noPhoto} alt="noPhoto" className={classes.imgIcon} />
                      }
                    </div>
                  </div>
                  <div className={classes.charItem}>
                    <div className={classes.label}>Cover Photo</div>
                    <div className={`${classes.photo} ${"featureImage"}`}>
                      {businessData.featureImage ?
                        <>
                          <div onClick={() => setImageModal(true)} className="Overlay">
                            <img alt="Camera" src={Camera} />
                          </div>
                          <img
                            src={businessData.featureImage}
                            alt="Profile"
                            onClick={() => setImageModal(true)}
                            className={classes.imgCoverIcon}
                          />
                        </>
                        :
                        <img src={noPhoto} alt="noPhoto" className={classes.imgCoverIcon} />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Widget>
        <Dailog
          open={imageModal}
          charityImage={true}
          handleClose={() => setImageModal(false)}
          maxWidth={"md"}
          title={businessData.shortIntro}
          content={
            <div className={classes.reasonItem}>
              <img
                className="img-fluid"
                src={businessData.featureImage}
                alt="Profile"
              />
            </div>
          }
        >
          <AddIcon className={classes.closeIcon} onClick={() => setImageModal(false)} />
        </Dailog>
      </>
    );
  } else {
    return <Redirect to="/app/customer-management" />;
  }
}