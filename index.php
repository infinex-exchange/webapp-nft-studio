<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../templates/head.php'); ?>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT Studio</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="jumbotron-studio row m-0 px-4">
                <div class="col-12">
                    <h2 class="d-none d-lg-block">Vayamos</h2>
                    <h1>NFT Studio</h1>
                    <strong>
	                    NFT creation made simple
                    </strong>
                </div>
            </div>
            
            <div class="row gx-0 gx-lg-3 gy-3 m-0">
                
                <div class="col-12">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
        	                <div class="col-12 pt-2 pb-4 text-center">
                                <h3>What are we doing today?</h3>
        		            </div>
        		            <div class="col-12 col-lg-4">
                                
                                <div class="p-2 background hoverable rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio1">
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
		                                    <h5>Create new NFT collection</h5>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
                            
                            <div class="col-12 col-lg-4">
                                
                                <div class="p-2 background hoverable rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio1">
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
		                                    <h5>Add NFT to an existing collection</h5>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
                            
                            <div class="col-12 col-lg-4">
                                
                                <div class="p-2 background hoverable rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio1">
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
		                                    <h5>Create single NFT without collection</h5>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
        	            </div>
        	        </div>
        	    </div>
            
            </div>
            
            <div class="row m-0 px-4 py-5">
                <div class="col-12 col-lg-9">
                    <h3>
                        <i class="fa-regular fa-money-bill-1"></i>
                        No additional costs
                    </h3>
                    <span class="secondary">
	                    The price of the mining plan includes all maintenance fees and electricity costs. No additional fees are charged from the mined amount. You get exactly as much crypto as you could mine on your own hardware with the same power.
                    </span>
                    <h3 class="pt-5">
                        <i class="fa-solid fa-microchip"></i>
                        Maintenance free
                    </h3>
                    <span class="secondary">
                        You don't need to have any technical knowledge to start. Just buy a mining plan and watch your profits. Our specialists take care of the proper configuration and maintenance of the mining equipment 24 hours a day.
                    </span>
                </div>
                <div class="col-8 col-lg-3 mx-auto">
                    <img src="/nft/studio/img/painting.png" class="img-fluid">
                </div>
            </div>
        
        <!-- / Root container -->
        </div>
        
        <?php include('../../../templates/modals.php'); ?>
        <script src="/nft/studio/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../../templates/footer.html'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
