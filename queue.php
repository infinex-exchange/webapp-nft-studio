<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Minting queue | Infinex NFT Studio</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 ui-card ui-column">
            
            <div class="row">
                <h3>Minting queue</h3>
            </div>
            
            <div class="row">
                <div id="queue-running" class="col-12 ui-card-light">
					<div class="row">
						<div class="col-12">
							<h5>Minting in progress...</h5>
							<p>
							    Your tasks are being processed. Once completed, created NFTs will
							    appear in your main NFT wallet.
							</p>
						</div>
		                <div class="col-12">
		                    <div class="indet-progress-bar">
		                        <div class="indet-progress-bar-value"></div>
		                    </div>
		                </div>
				    </div>
                </div>
            </div>
            
            <div id="queue-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/studio/js/queue.js?<?php echo filemtime(__DIR__.'/js/queue.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
