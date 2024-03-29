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
                <h3 class="title-create d-none">Create collection</h3>
                <h3 class="edit-only d-none">Edit collection</h3>
            </div>
            
            
            
            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="row">               
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Collection name:</h5>
                        </div>
                        <div class="col-12">
                            <input id="col-name" type="text" class="form-control">
                        </div>
                        <div id="col-name-invalid" class="small text-red pt-1 d-none">
	                        <i class="fa-solid fa-triangle-exclamation"></i>
	                        Invalid collection name format
                        </div>
                        <div id="col-name-required" class="small text-red pt-1 d-none">
	                        <i class="fa-solid fa-triangle-exclamation"></i>
	                        Collection name is mandatory
                        </div>
                
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Network:</h5>
                        </div>
                        <div class="col-12">
                            <?php include('../../../templates/select_net.php'); ?>
                        </div>
                        
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Website:</h5>
                        </div>
                        <div class="col-12">
                            <input id="col-website" type="text" class="form-control">
                        </div>
                        <div id="col-website-invalid" class="small text-red pt-1 d-none">
	                        <i class="fa-solid fa-triangle-exclamation"></i>
	                        Invalid URL format
                        </div>
                        
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Twitter:</h5>
                        </div>
                        <div class="col-12">
                            <input id="col-twitter" type="text" class="form-control">
                        </div>
                        <div id="col-twitter-invalid" class="small text-red pt-1 d-none">
	                        <i class="fa-solid fa-triangle-exclamation"></i>
	                        Invalid format. Please enter only the Twitter username without "@", not the profile link
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-6 my-auto">
                    <div class="row">
                        <div class="col-12 pt-4 pb-1">
                            <h5 class="secondary">Icon:</h5>
                        </div>
                        <div id="col-icon" class="col-12">
                        </div>
                    </div>
                </div>
    
                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">Description:</h5>
                </div>
                <div class="col-12">
                    <textarea id="col-description" class="w-100" rows="10"></textarea>
                </div>
                <div id="col-description-invalid" class="small text-red pt-1 d-none">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Description contains forbidden characters
                </div>
                
                <div class="col-12 pt-4 pb-1">
                    <h5 class="secondary">Banner:</h5>
                </div>
                <div id="col-banner" class="col-12">
                </div>
            </div>
        
        </div>
        
        <div class="col-12 pt-4">
            <div class="row">
	            <div class="col-6 col-lg-auto pe-1">
		            <button id="col-submit" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Save changes
                    </button>
	            </div>
	            <div class="col-6 col-lg-auto ps-1 pe-1">
		            <button id="col-submit-and-mint" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-check"></i>
                        Save and mint
                    </button>
	            </div>
	            <div class="col-6 col-lg-auto ps-lg-1 pe-1 pt-2 pt-lg-0 edit-only d-none">
		            <button id="col-remove" type="button" class="btn btn-primary w-100">
                        <i class="fa-solid fa-trash-can"></i>
                        Remove collection
                    </button>
	            </div>
            </div>
        </div>
        
        <div class="col-12 edit-only pt-5 d-none">
            <div class="row">
                <h3 class="pt-4">NFTs in this collection:</h3>
            </div>
            
            <div class="row">
	            <div class="col-12">
		            <a href="#" id="btn-add-nft" class="btn btn-primary btn-sm">
		                <i class="fa-solid fa-plus"></i>
		                Add NFT
		            </a>
	            </div>
            </div>
            
            <div id="nfts-data" class="row">
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
        <script src="/nft/studio/js/collection.js?<?php echo filemtime(__DIR__.'/js/collection.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
