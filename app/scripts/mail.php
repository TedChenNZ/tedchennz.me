<?php
//if "email" variable is filled out, send email
  if (isset($_REQUEST['email']))  {
    //Email information
    $admin_email_tcgm = "tedchennz@gmail.com";
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $message = $_REQUEST['message'];
    
    $subject = "Email submission from tedchennz.me";

    $message = "Name: " . $name . "\n" . "Email: " . $email . "\n\n" . $message; 

    //send email
    mail($admin_email_tcgm, $subject, $message, "From: no-reply@tedchennz.me");
    
    //Email response
    echo "Success";
  }
  else  {
    echo "Fail";
  }
?>