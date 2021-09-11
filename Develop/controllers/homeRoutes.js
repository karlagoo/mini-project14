const router = require('express').Router();
const { User , Project}= require('../models');

router.get('/', async (req, res)=> {
    const projectData = await Project.findAll();
    console.log(projectData)

    const projects = projectData.map((project) =>
    project.get({ plain: true})
    );
    console.log(projects);
    res.render('homepage', {projects});
});

router.get('/project/:id', async (req, res) =>{
    try{
      const projectData = await Project.findByPk(req.params.id,{
        where:{
          id: req.params.id
        }
      });
      const project = projectData.get({ plain: true});
      console.log(project);
      res.render('singleproject', {project})
      
    }
    catch(err){
      res.status(500).json(err);
    }
  })

module.exports = router;