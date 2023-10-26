<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Infinex NFT Studio</title>
    </head>
    <body class="body-background">
    
        <?php include('../../../inc/body.php'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 user-only h-rest pt-2 p-0">
        
            <div class="jumbotron-studio row m-0 px-4">
                <div class="col-12">
                    <h2 class="d-none d-lg-block">Infinex</h2>
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
        	                <div class="col-12 pt-2 pb-3 text-center">
                                <h3>What are we doing today?</h3>
        		            </div>
        		            <div class="col-12 col-lg-4 pb-3">
                                
                                <div class="p-3 background wizard-item rounded h-100" data-wizard-mode="col-new">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 30px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio-wizard" value="col-new">
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
                                            <div class="row">
                                                <div class="col-12">
		                                            <h5>Create new collection</h5>
                                                </div>
                                                <div class="col-12 pt-2">
		                                            Select if you plan to create multiple similar NFTs
                                                </div>
                                            </div>
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
                            
                            <div class="col-12 col-lg-4 pb-3">
                                
                                <div class="p-3 background wizard-item rounded h-100" data-wizard-mode="col-add">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 30px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio-wizard" value="col-add">
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h5>Add NFT to existing collection</h5>
                                                </div>
                                                <div class="col-12 pt-2">
		                                            <?php include(__DIR__.'/../templates/select_col.php'); ?>
                                                </div>
                                            </div>
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
                            
                            <div class="col-12 col-lg-4 pb-3">
                                
                                <div class="p-3 background wizard-item active rounded h-100" data-wizard-mode="single">
		                            <div class="row">
		                                <div class="col-auto my-auto text-center" style="width: 30px">
			                                <div class="pretty p-bigger p-default p-round">
										        <input type="radio" name="radio-wizard" value="single" checked>
										        <div class="state p-primary">
											        <label></label>
										        </div>
										    </div>
		                                </div>
		                                <div class="col small my-auto">
                                            <div class="row">
		                                        <div class="col-12">
                                                    <h5>Create single NFT without collection</h5>
                                                </div>
                                                <div class="col-12 pt-2">
		                                            A great choice for occasional NFTs
                                                </div>
                                            </div>
		                                </div>
		                            </div>
		                        </div>
                                
        		            </div>
                            
                            <div class="col-12 col-lg-4 mx-auto pt-2">
                                <button id="btn-continue" type="button" class="btn btn-primary w-100">
                                    <i class="fa-solid fa-rocket"></i>
                                    Continue
                                </button>
                            </div>
        	            </div>
        	        </div>
        	    </div>
            
            </div>
            
            <div class="row m-0 px-4">
                <div class="col-12 col-lg-9 py-5">
                    <h3>
                        <i class="fa-solid fa-circle-check"></i>
                        Don't need technical skills
                    </h3>
                    <span class="secondary">
	                    We've simplified the NFT creation process to the maximum.
                        You don't have to worry about hosting, generating hashes, etc.
                        Just fill in the wizard fields and enjoy the ready-made NFT.
                    </span>
                    <h3 class="pt-5">
                        <i class="fa-solid fa-circle-check"></i>
                        Without additional software
                    </h3>
                    <span class="secondary">
                        The entire NFT creation process takes place in the browser window.
                        From uploading the file to putting the finished NFT up for sale.
                    </span>
                </div>
                <div class="col-8 col-lg-3 py-5 mx-auto">
                    <img src="/nft/studio/img/painting.png" class="img-fluid">
                </div>
            </div>
        
        <!-- / Root container -->
        </div>
        
        <script src="/nft/studio/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../../inc/footer.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
