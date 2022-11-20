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
        
            <div class="row h-rest m-0">
                <div class="col-12 col-lg-6 me-auto my-auto px-4 py-5">
                    <div class="row">
                        <div class="col-12 jumbotron">
                            <h1>NFT Studio</h1>
                            <p>
	                            NFT creation made simple
                            </p>
                        </div>
                        <div class="col-9 mx-auto d-none d-lg-block">
                            <img src="/nft/studio/img/studio_jumbotron.png" class="img-fluid">
                        </div>
                    </div>
                </div>
            
                <div class="col-12 col-lg-5 p-0 my-auto">
                    <div class="p-2 p-lg-4 ui-card-light rounded">
                    
                        <div class="row pt-3 text-center">
                            <h3>What are we creating today?</h3>
                        </div>
                        
                        <div class="row py-3">
                        
                            <div class="col-12">
	                            <div class="p-2 background rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
		                                    <i style="color: var(--color-ultra)" class="fa-solid fa-infinity fa-2x"></i>
		                                </div>
		                                <div class="col small my-auto">
		                                    Once created bridge is valid forever and can be used unlimited number of times.
		                                    <br>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    
		                    <div class="col-12">
	                            <div class="p-2 background rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
		                                    <i style="color: var(--color-ultra)" class="fa-solid fa-infinity fa-2x"></i>
		                                </div>
		                                <div class="col small my-auto">
		                                    Once created bridge is valid forever and can be used unlimited number of times.
		                                    <br>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    
		                    <div class="col-12">
	                            <div class="p-2 background rounded">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 60px">
		                                    <i style="color: var(--color-ultra)" class="fa-solid fa-infinity fa-2x"></i>
		                                </div>
		                                <div class="col small my-auto">
		                                    Once created bridge is valid forever and can be used unlimited number of times.
		                                    <br>
		                                    You don't have to worry about the address expiry date.
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    
		                </div>
                            
                    </div>
                </div>
                
                <div class="col-7 mx-auto py-5 d-lg-none">
                    <img src="/nft/studio/img/studio_jumbotron.png" class="img-fluid">
                </div>

            </div>
        
        <!-- / Root container -->
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-buy">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to purchase the Mining Cloud contract?
                        <br>
                        The amount of <span id="mcb-price"></span> will be charged from your Vayamos account.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="mcb-buy" type="button" class="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include('../../../templates/modals.php'); ?>
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/../js/render_offer.js'); ?>"></script>
        <script src="/nft/js/index.js?<?php echo filemtime(__DIR__.'/../js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../../templates/footer.html'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
