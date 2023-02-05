<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>My projects | Infinex NFT Studio</title>
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
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row">
                <h3>My projects</h3>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <a href="/nft/studio/collection/add" class="btn btn-primary btn-sm ms-0">
		                <i class="fa-solid fa-plus"></i>
		                Add collection
		            </a>
		            <a href="/nft/studio/nft/add" class="btn btn-primary btn-sm">
		                <i class="fa-solid fa-plus"></i>
		                Add NFT
		            </a>
                </div>
            </div>
            
            <div id="projects-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/studio/js/render_projects.js?<?php echo filemtime(__DIR__.'/js/render_projects.js'); ?>"></script>
        <script src="/nft/studio/js/projects.js?<?php echo filemtime(__DIR__.'/js/projects.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
