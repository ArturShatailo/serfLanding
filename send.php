<?php


if(isset($_POST['submit'])){
$to = "arturshatailo@gmail.com";
$from = $_POST['email'];
$first_name = $_POST['first_name'];
$subject = "Message from the web-site contact form";
$subject2 = "Copy of your form submission";
$message = "The client ".$first_name.":"."\n"."email: ".$from."\n"."Left the follow message:" . "\n\n" . $_POST['message'];
$message2 = "Here is a copy of your message you sent to the SerfMarket Landign Page:"."\n\n" . $_POST['message'];

$headers = "From:" . $from;
$headers2 = "From:" . $to;

mail($to,$subject,$message,$headers);
mail($from,$subject2,$message2,$headers2);
echo "<div class="."'messageMail'".">
		<p>The message was sent. Thank you, ".$first_name.".</p>
		<p>We will contact you as soon as possible.<br/></p>
		<a href='index.html'>Back to web-site.</a>
		</div>";
}

?>
	<link rel="stylesheet" type="text/css" href="css/style.css">;
	<script language="JavaScript" type="text/javascript">
		function changeurl() {
			eval(self.location = "index.html");
		}
		window.setTimeout("changeurl();", 15000);
	</script>