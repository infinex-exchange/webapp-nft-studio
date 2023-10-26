<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/nft/studio/config.js?<?php echo filemtime(__DIR__.'/config.js'); ?>"></script>
        <title>Infinex NFT Studio</title>
    </head>
    <body>
    
        <?php include('../../../inc/body.php'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 ui-card ui-column">
        <div class="row">
        <div class="col-12 col-lg-8">
            
            
            
            
            <div class="row">
                <h3 class="title-create d-none">Create NFT</h3>
                <h3 class="edit-only d-none">Edit NFT</h3>
            </div>
            
            
            
            <div class="row">               
                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">NFT name:</h5>
                </div>
                <div class="col-12 col-lg-6">
                    <input id="nft-name" type="text" class="form-control">
                </div>
                <div id="nft-name-invalid" class="small text-red pt-1 d-none">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Invalid NFT name format
                </div>
                <div id="nft-name-required" class="small text-red pt-1 d-none">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    NFT name is mandatory
                </div>

                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">NFT file:</h5>
                </div>
                <div id="nft-data" class="col-12">
                </div>
                
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Collection:</h5>
                        </div>
                        <div class="col-12">
                            <?php include('../templates/select_col.php'); ?>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Network:</h5>
                        </div>
                        <div class="col-12">
                            <?php include('../../../templates/select_net.php'); ?>
                        </div>
                    </div>
                </div>
    
                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">Description:</h5>
                </div>
                <div class="col-12">
                    <textarea id="nft-description" class="w-100" rows="10"></textarea>
                </div>
                <div id="nft-description-invalid" class="small text-red pt-1 d-none">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Description contains forbidden characters
                </div>
                
                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">Attributes:</h5>
                </div>
                <div class="col-12 col-lg-9" id="attributes">
                </div>
                <div class="col-12">
		            <button type="button" class="btn btn-primary btn-sm" onClick="addAttribute()">
		                <i class="fa-solid fa-plus"></i>
		                Add attribute
		            </button>
	            </div>
                
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Royalty percentage:</h5>
                        </div>
                        <div class="col-12">
                            <input id="nft-royalty-perc" type="range" class="form-range" min="0" max="90" step="0.5" value="0">
                        </div>
                        <div class="col-12">
                            <span class="small secondary range-value" for="nft-royalty-perc" suffix=" %"></span>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">License file:</h5>
                        </div>
                        <div id="nft-license" class="col-12">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-12 pt-4">
            <div class="row">
	            <div class="col-6 col-lg-auto pe-1">
		            <button id="nft-submit" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Save changes
                    </button>
	            </div>
	            <div class="col-6 col-lg-auto ps-1 pe-1">
		            <button id="nft-submit-and-mint" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-check"></i>
                        Save and mint
                    </button>
	            </div>
	            <div class="col-6 col-lg-auto ps-lg-1 pe-1 pt-2 pt-lg-0 edit-only d-none">
		            <button id="nft-remove" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-trash-can"></i>
                        Remove NFT
                    </button>
	            </div>
            </div>
        </div>
        
        <!-- / Main column -->
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/studio/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <script src="/nft/studio/js/render_projects.js?<?php echo filemtime(__DIR__.'/js/render_projects.js'); ?>"></script>
        <script src="/nft/studio/js/upload.js?<?php echo filemtime(__DIR__.'/js/upload.js'); ?>"></script>
        <script src="/nft/studio/js/nft.js?<?php echo filemtime(__DIR__.'/js/nft.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
