<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/nft/studio/config.js?<?php echo filemtime(__DIR__.'/config.js'); ?>"></script>
        <title>Infinex NFT Studio</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../../templates/navbar.php'); ?>
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
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Collection name:</h5>
                </div>
                <div class="col-12 col-lg-6">
                    <input id="col-name" type="text" class="form-control">
                </div>
                
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Network:</h5>
                </div>
                <div class="col-12 col-lg-6">
                    <?php include('../../../templates/select_net.php'); ?>
                </div>
    
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Description:</h5>
                </div>
                <div class="col-12">
                    <textarea id="col-description" class="w-100" rows="10"></textarea>
                </div>
                
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Website:</h5>
                </div>
                <div class="col-12 col-lg-6">
                    <input id="col-website" type="text" class="form-control">
                </div>
                
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Twitter:</h5>
                </div>
                <div class="col-12 col-lg-6">
                    <input id="col-twitter" type="text" class="form-control">
                </div>
                
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Icon:</h5>
                </div>
                <div id="col-icon" class="col-12 col-lg-6">
                </div>
                
                <div class="col-12 pt-3 pb-1">
                    <h5 class="secondary">Banner:</h5>
                </div>
                <div id="col-banner" class="col-12 col-lg-6">
                </div>
                
                <div class="col-12 pt-3">
                    <button id="col-submit" type="button" class="btn btn-primary">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Save changes
                    </button>
                    <button id="col-submit-and-mint" type="button" class="btn btn-primary">
                        <i class="fa-solid fa-check"></i>
                        Save and mint
                    </button>
                </div>
            </div>
        
        </div>
        
        <div class="col-12 edit-only d-none">
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
            
            <div id="nfts-data">
            </div>
        </div>
        
        <!-- / Main column -->
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../../../js/validate.js'); ?>"></script>
        <script src="/nft/studio/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <script src="/nft/studio/js/render_projects.js?<?php echo filemtime(__DIR__.'/js/render_projects.js'); ?>"></script>
        <script src="/nft/studio/js/upload.js?<?php echo filemtime(__DIR__.'/js/upload.js'); ?>"></script>
        <script src="/nft/studio/js/collection.js?<?php echo filemtime(__DIR__.'/js/collection.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
