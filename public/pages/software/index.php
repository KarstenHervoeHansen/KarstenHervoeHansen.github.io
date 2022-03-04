<html>
<title>Software</title>

<?php include '../../includes/pageinit.php'; ?>  


<style>
html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif;}
</style>

<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-red w3-card">
    <a class="w3-bar-item w3-button w3-padding-large  w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="ToggleSideMenu()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="/index.php" class="w3-bar-item w3-button w3-large">Home</i></a>

<!-- <?php include '../horizontal/dkmeter.php'; ?> -->
    <?php include '../horizontal/dkt7.php'; ?>    
    <?php include '../horizontal/msd.php'; ?> 
    <?php include '../horizontal/pt0760.php'; ?>
    <?php include '../horizontal/spg.php'; ?>

  </div>
</div>

<!-- Navbar on small screens -->
<div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">

<!--  <?php include '../vertical/dkmeter.php'; ?> -->
  <?php include '../vertical/dkt7.php'; ?> 
  
<!--  <?php include '../vertical/pt0760.php'; ?>  -->
<!--  <?php include '../vertical/msd.php'; ?>  -->
  <?php include '../vertical/spg.php'; ?> 

</div>

<!-- Page content -->
<div class="w3-content" style="max-width:2000px;margin-top:46px">


  <?php include "../../prices/" . $PriceDir . "/list.php"; ?>


  <div class="w3-row w3-padding-128">
    <div class="w3-twothird w3-container">
      <h1 class="w3-text-teal">Firmware and Software Downloads</h1>
      <p>The above software downloads are all free except for where a license key is requested. Always make backup of your unit before you upgrade and install optional license keys as instructed in order to avoid broken software. If you are in doubt contact us before you do anything.<br>
      <br><h5>Note. From March 2019 all firmware updates and software upgrades will only be available through the Online updater and subject to a yearly subscription fee of <?php echo $OnLineFee; ?>.</h5></p>
      <h4>
      <a href="http://dkonline.hansens.dk/index.php" class="w3-bar-item w3-button w3-text-teal" title="
       Free Online updater for all models
       including cloning capability"
      >Download the DKMeter-Online</a>
      </h>
    </div>
  </div>
  
  <div class="w3-row w3-padding-128">
    <div class="w3-twothird w3-container">
      <h1 class="w3-text-teal">Options available for the DKT7 and Subscription Keys</h1>
      <p>The DKT7 is loaded with a lot of optional software as standard. All units share the hardware platform and the different models are built from bundled sets of licence keys. Therefore you can always add functionality to your existing unit. The procedure for installing a licence is simple. Order a key at <A HREF="mailto:kh@hansens.dk">kh@hansens.dk</A> including your serial number and VAT number. We will invoice you and upon receipt payment we will issue the license key including instructions how to activate. No external computer is required for the activation.</p>
    </div>
  </div>  

    
    <!-- First Photo Grid-->
  <div class="w3-row-padding w3-padding-16 " id="GridLine1">
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/multiloudness.jpg?" alt="Multi Loudness Image" title="
       Two Loudness Sets on a SDI Stream" style="width:100%">
      <h3>Multi-Loudness</h3>
      <a href="https://youtu.be/-UBwzcqpPnw" allowfullscreen >Watch the introduction movie here</a>
      <p>This option enables simultaneous reading of up-to four loudness and true-peak sets. Display of multiple surround sound and stereo sets at the same time.</p>
      <p>Order: LOUDNESS EXTENDED<br><?php echo $LoudnessExtended; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/loudnessautomation.jpg?" alt="Loudness Automation Image" title="
       5.1 Surround Atomation Session" style="width:100%">
      <h3>Loudness Automation</h3>
      <a href="https://youtu.be/VDtUGkOLwrw" allowfullscreen >Watch the Loudness Automation movie here</a>
      <p>Compliance mixing is a time consuming task. This option removes the boring redundant re-doing-the-job during the mixing process. Upto 4 hours of mixing!</p>
      <p>Order: LOUDNESS AUTOMATION<br><?php echo $LoudnessAutomation; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/madisetup.jpg" alt="MADI YouTube Movie" title="
      Image from the MADI setup movie" style="width:78%">
      <h3>MADI Option</h3>
      <a href="https://youtu.be/B2T4LYtXDJ4" allowfullscreen >Watch the MADI setup movie here</a>
      </p>Turn the SD Input into a 64 channel MADI interface. No additional hardware required just install the license key. Perfect together with the ATMOS option or as a multi-channel MADI analyser.<p>
      <p>Order: MADI INPUT<br><?php echo $MADIInput; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/atmosibc2017.jpg" alt="ATMOS YouTube Movie" title="
      The IBC2017 demo video on YouTube" style="width:78%">
      <h3>ATMOS Surround</h3>
      <a href="https://youtu.be/__NclgOQwec" allowfullscreen >Watch the IBC 2017 movie here</a>
      <p>See the audio in the 3D space. Show up-to 64 MADI channels and display in a three level SuperStarFish including the perceived loudness. A must for ATMOS mixers and QC monitoring.</p>
      <p>Order: ATMOS<br><?php echo $ATMOS; ?></p>
    </div>
  </div>

  
  <!-- Second Photo Grid-->
  <div class="w3-row-padding w3-padding-16">
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/lipsync.jpg" alt="LipSync Screen Dump" title="
      Screen capture from YouTube movie" style="width:80%">
      <h3>LipSync Measurement</h3>
      <a href="https://youtu.be/-mtj-IDI0LI" allowfullscreen >Watch LipSync Part 1 movie here</a>
      <p>Measure the timing between audio and video on cameras, players and installations. Before you start watch the movies to learn about the pitfalls and traps in this discipline.</p>
      <p>Order: LIPSYNC<br><?php echo $LipSync; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/basicwfm.jpg?" alt="Waveform Basic" title="
      Combined waveform and audio display" style="width:100%">
      <h3>Waveform Basic</h3>
      <p>Turn your DKT7M++ into a 3G audio and video analyser in a few seconds. The function is preinstalled on your unit waiting for you to wake it up. Chose this option if your need is basic and upgrade later should you need more functionality.</p>
      <p>Order: WAVEFORM<br><?php echo $Waveform; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/extwfm.jpg?" alt="Waveform Extended"  title="
      Waveform display extended without audio" style="width:100%">   
      <h3>Waveform Extended</h3>
      <p>Upgrade the basic waveform monitoring with test functionality and line selection, frame display and more..</p>
      <p>Order: WAVEFORM EXTENDED<br><?php echo $WaveformExtended; ?></p>
    </div>
    <div class="w3-quarter">
      <img src="<?php echo $LocalDownloadPath; ?>software/dkt7/graphics/administratortools.jpg?" alt="Administrator Folder" title="
      Directory listing of a memorystick with right-click option on display" style="width:100%">      
      <h3>Administrator Tools</h3>
      <p>A must have option. Allows the use of a USB memory stick for the maintenance of your unit. Copy/paste of presets, cloning, updates, dynamic license key control and much more...</p>
      <p>Order: ADMINISTRATOR TOOLS<br><?php echo $AdministratorTools; ?></p>
    </div>
  </div>

  <?php include '../../includes/footer.php'; ?>  
   
<!-- End Page Content -->
</div>

<?php include '../scripts/standard.php'; ?> 

</body>
</html>