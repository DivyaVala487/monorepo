import React, { useState } from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";

// import ResuableModal from "../ResuableModel/ResuableModel";
import { Button } from "@mui/joy";
import Form from "../form/form";
import ReusableModal from "../ResuableModel/ResuableModel";
import Tooltip from "../ToolTip/Tooltip";
import Calendar from "../Calender/Calender";
import "./ParentComponent.css";
import Tabs from '../Tabs/Tabs';
import Table from "../Table/MainTable/MainTable";
import Alerts from "../Alerts/Alerts";

const ParentComponent = () => {
  const [logout, setLogOut] = useState(false);
  const [form, setForm] = useState(false);
  const [image, setImage] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [type, setType] = useState("");
  interface SliderItem {
    main_heading: string;
    slider_heading: string;
    slider_paragraph: string;
    slider_image: string;
    button_text?: string;
    show_button: boolean;
    show_text: boolean;
    show_image: boolean;
    carousel_position: "left" | "right";
    image_width: string;
    image_height: string;
  }
  const sliderData: SliderItem[] = [
    {
      main_heading: "Welcome to Our Site",
      slider_heading: "Featured Product 1",
      slider_paragraph: "This is the first product description.",
      slider_image:
        "https://i.pinimg.com/236x/f8/98/bc/f898bc26bcb78e53b7d048bb99a63e11.jpg",
      button_text: "Learn More",
      show_button: true,
      show_text: true,
      show_image: true,
      carousel_position: "left",
      image_width: "300px",
      image_height: "200px",
    },
    {
      main_heading: "Discover More",
      slider_heading: "Featured Product 2",
      slider_paragraph: "This is the second product description.",
      slider_image:
        "https://i.pinimg.com/236x/db/08/87/db0887418d476a7051df34feae33ceba.jpg",
      button_text: "Shop Now",
      show_button: true,
      show_text: true,
      show_image: true,
      carousel_position: "left",
      image_width: "300px",
      image_height: "200px",
    },
    {
      main_heading: "Amazing Offers",
      slider_heading: "Featured Product 3",
      slider_paragraph:
        "This is the third product description with amazing offers.",
      slider_image:
        "https://i.pinimg.com/236x/f8/98/bc/f898bc26bcb78e53b7d048bb99a63e11.jpg",
      button_text: "Get Started",
      show_button: true,
      show_text: true,
      show_image: true,
      carousel_position: "left",
      image_width: "300px",
      image_height: "200px",
    },
    {
      main_heading: "Exclusive Deals",
      slider_heading: "Featured Product 4",
      slider_paragraph:
        "This is the fourth product description with exclusive deals.",
      slider_image:
        "https://i.pinimg.com/236x/db/08/87/db0887418d476a7051df34feae33ceba.jpg",
      button_text: "View More",
      show_button: true,
      show_text: true,
      show_image: true,
      carousel_position: "left",
      image_width: "300px",
      image_height: "200px",
    },
    {
      main_heading: "Join Us Today",
      slider_heading: "Featured Product 5",
      slider_paragraph:
        "This is the fifth product description inviting you to join.",
      slider_image:
        "https://i.pinimg.com/236x/f8/98/bc/f898bc26bcb78e53b7d048bb99a63e11.jpg",
      button_text: "Sign Up",
      show_button: true,
      show_text: true,
      show_image: true,
      carousel_position: "left",
      image_width: "300px",
      image_height: "200px",
    },
  ];

  const containerStyles = {
    backgroundColor: "#444",
    height: "70vh",
    borderRadius: "20px",
  };

  const prevButtonStyles = {
    backgroundColor: "red",
  };

  const nextButtonStyles = {
    backgroundColor: "blue",
  };

  const logoutModal = () => {
    setType("logout");
    setLogOut(true);
  };
  const formmodal = () => {
    setType("form");
    setForm(true);
  };

  const imageModal = () => {
    setType("image");
    setImage(true);
  };

  const informationModal = () => {
    setType("information");
    setOpenInfoModal(true);
  };

//   for the alerts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const [alertConfig, setAlertConfig] = useState<any>(null);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleShowAlert = (type: any, message: string, backgroundColor: string, textColor: string) => {
//     setAlertConfig({
//       message,
//       type,
//       backgroundColor,
//       textColor,
//       duration: 3000, // Auto-dismiss after 3 seconds
//       icon: type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle',
//     });
//   };

const [showAlert, setShowAlert] = useState(false);

const handleButtonClick = () => {
  // Show the alert when button is clicked
  setShowAlert(true);

  // Optionally hide the alert after a certain time
  setTimeout(() => {
    setShowAlert(false);
  }, 5000); // Auto-hide after 5 seconds
};


  //   for the calender functionality

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };
  const data = [
    { name: 'John Doe', age: 28, email: 'john@example.com', office:"absyz" },
    { name: 'Jane Smith', age: 34, email: 'jane@example.com',office:"absyz" },
    { name: 'Mark Brown', age: 22, email: 'mark@example.com', office:"absyz" },
    { name: 'Sara White', age: 27, email: 'sara@example.com',  office:"absyz" },

    { name: 'Alex Green', age: 31, email: 'alex@example.com',office:"absyz" },
  ];

  const headers = ['Name', 'Age', 'Email','office'];

//   Tabs Items
const tabItems = [
    {
      label: 'Home',
      content: (
        <div className="card">
          <div className="card-icon">
            <img src="https://i.pinimg.com/236x/8b/8d/68/8b8d68a2fbfd23930de9dbc9da6fb0c2.jpg" alt="Icon 1" />
          </div>
          <h3 className="card-title">Welcome to Our Website</h3>
          <p className="card-description">
            Discover our amazing services and offerings. Our platform is designed to help you achieve your goals effortlessly.
          </p>
          <button className="card-button">Learn More</button>
        </div>
      ),
    },
    {
      label: 'About Us',
      content: (
        <div className="card">
          <div className="card-icon">
            <img src="https://i.pinimg.com/236x/d8/77/1e/d8771ea436d8ade2301502171d61c272.jpg" alt="Icon 2" />
          </div>
          <h3 className="card-title">Who We Are</h3>
          <p className="card-description">
            We are a dedicated team committed to providing excellent service and solutions tailored to your needs.
          </p>
          <button className="card-button">Get Started</button>
        </div>
      ),
    },
    {
      label: 'Contact Us',
      content: (
        <div className="card">
          <div className="card-icon">
            <img src="https://i.pinimg.com/236x/6a/99/ee/6a99ee843798375c5f7049316e8d31ed.jpg" alt="Icon 3" />
          </div>
          <h3 className="card-title">Get in Touch</h3>
          <p className="card-description">
            We would love to hear from you! Reach out to us for any questions, feedback, or assistance.
          </p>
          <button className="card-button">Contact Us</button>
        </div>
      ),
    },
  ];
  

  return (
    <div>
      {/* for the custom curosal */}
      <h1 className="responsive-heading">Carousel</h1>
      <CustomCarousel
        sliderData={sliderData}
        containerStyles={containerStyles}
        prevButtonStyles={prevButtonStyles}
        nextButtonStyles={nextButtonStyles}
      />

      {/* for the log out popup */}
      <h1 className="responsive-heading">popup modals</h1>
      <Button onClick={logoutModal}>Open</Button>
      {logout && (
        <ReusableModal
          open={logout}
          size="lg"
          buttonText="logout"
          type={type}
          setOpen={setLogOut}
          buttonColor="red"
          heading="Sign out"
          subHeading="Are You Really Want To Logout"
        />
      )}
      {/* for the form popup */}
      <Button onClick={formmodal}>Form Modal</Button>
      {form && (
        <ReusableModal
          open={form}
          size="lg"
          type={type}
          setOpen={setForm}
          component={<Form />}
          buttonColor="red"
          heading="Form Heading"
          subHeading="Submit your details"
        />
      )}
      {/* image popup  */}
      <Button onClick={imageModal}>Image</Button>
      {image && (
        <ReusableModal
          size="md"
          open={image}
          type="image"
          setOpen={setImage}
          heading="Image Modal"
          subHeading="Check out this image"
          imageSrc="https://i.pinimg.com/236x/cc/da/f2/ccdaf230d29ea7728b28db992e669129.jpg"
          imageHeight="200px"
          imageWidth="300px"
          buttonText="Click Me"
          buttonColor="white"
          buttonBgColor="blue"
          buttonTextSize="16px"
        />
      )}
      {/* for the informational model */}
      <Button onClick={informationModal}>information</Button>
      <ReusableModal
        size="md"
        open={openInfoModal}
        type="information"
        setOpen={setOpenInfoModal}
        heading="Information Modal"
        subHeading="Here is some additional information"
        infoContent="This is the detailed content that the user can read inside the modal. It can be dynamic and change based on what information you want to display."
        imageSrc="https://i.pinimg.com/236x/cc/da/f2/ccdaf230d29ea7728b28db992e669129.jpg"
        imageHeight="150px"
        imageWidth="200px"
        buttonText="Learn More"
        buttonColor="white"
        buttonBgColor="blue"
        buttonTextSize="14px"
      />

      {/* tool tip */}
      <div className="tool">
        <h1 className="responsive-heading">Tool Tip</h1>
        <Tooltip content="This is a tooltip" position="top">
          <button>Hover over me</button>
        </Tooltip>

        <Tooltip
          content="Another tooltip on the bottom"
          position="bottom"
          backgroundColor="yellow"
          textColor="black"
        >
          <span>Hover over this text</span>
        </Tooltip>

        {/* for the calender */}

      
      </div>
      <div className="calender">
          <h1 className="responsive-heading">Reusable Calendar</h1>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            disablePastDates={false} 
          />
        </div>

        <div>
      <h1 className="responsive-heading">Reusable Tabs Component</h1>
      <Tabs tabs={tabItems} activeTabColor="purple" inactiveTabColor="lightgray" />
    </div>
    <div>
        <h1 className="responsive-heading">Table Component</h1>
        <Table
      data={data}  
      headers={headers}  
      itemsPerPage={3}  
      rowHeight="60px"  
      rowColor="lightgray"  
    //   rowHoverColor="white"  
      rowBorderColor="#ddd"  
      rowTextAlign="center" 
      colWidths={['200px', '100px', '250px']}  
      colAlignments={['left', 'center', 'left']}  
      colHoverBackgroundColors={['#d0d0d0', '#d0d0d0', '#d0d0d0']}  
      tableWidth="85%"  
      tableBorderCollapse={true} 
      paginationProps={{
        totalPagesLabel: "out of",
        prevLabel: "Prev",
        nextLabel: "Next",
        showPageNumbers: true,
        disablePrevNextOnBoundaries: false, 
      }}
      rowPadding="15px"  
      colPadding="15px"  
      colFontSize="14px"  
      colFontWeight="bold"  
      colBorder="1px solid #999" 
    />
    </div>
    <div>
        <h1 className="responsive-heading">Reusable Alert Component</h1>
      <button onClick={handleButtonClick}>Trigger Alert</button>

      {/* Conditionally render the Alert component */}
      {showAlert && (
        <Alerts
        message="Loggined Succesfully!"
        backgroundColor="black"
        textColor="darkred"
        duration={0} // Setting this to 0 means it won't auto-hide
        icon="⚠️"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0,0,0,0.2)"
        position="top-left"  
        height="50px"         
        width="400px"         
        padding="20px"
        margin="10px"
        borderColor="red"
        borderWidth="2px"
        showCloseButton={true}
        closeButtonColor="darkred"
        // closeButtonHoverColor="lightred"
        fontSize="18px"
        fontWeight="bold"
        textAlign="left"
        zIndex={1000}
        onClose={() => setShowAlert(false)} // Close alert when close button is clicked
      />
      
      )}
    </div>
    
    </div>
  );
};

export default ParentComponent;
