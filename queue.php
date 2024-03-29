<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Minting queue | Infinex NFT Studio</title>
    </head>
    <body>
    
        <?php include('../../../inc/body.php'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row">
                <div id="queue-running" class="col-12 pb-4 d-none">
	                <div class="ui-card-light p-3">
					<div class="row">
						<div class="col-12">
							<h5>Minting in progress...</h5>
							<p class="secondary">
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
                
                <div class="col-12">
	                <h3>Minting queue</h3>
                </div>
                
                <div class="col-6 col-lg-auto pb-2 pe-1">
	                <button id="queue-start" type="button" class="btn btn-danger w-100 h-100 p-2">
                        <img src="/nft/studio/img/start_action.svg" width="24" height="24">
                        Start minting
                    </button>
                </div>
                <div class="col-6 col-lg-auto pb-2 ps-1">
	                <button id="queue-clear" type="button" class="btn btn-primary w-100 h-100 p-2">
                        <i class="fa-solid fa-trash-can"></i>
                        Clear the queue
                    </button>
                </div>
            </div>
            
            <div id="queue-data" class="row">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/studio/js/queue.js?<?php echo filemtime(__DIR__.'/js/queue.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
