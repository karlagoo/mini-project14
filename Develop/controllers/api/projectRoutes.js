const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req,res)=>{
  try{
    const projectData= await Project.findAll();
    console.log(projectData);
    const projects = projectData.map((project) => project.get({ plain: true }));
  res.render('homepage', {projects})
  console.log(projects);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) =>{
  try{
    const projectData = await Project.findByPk(req.params.id,{
      where:{
        id: req.params.id
      }
    });
    const projects = projects.map((project) => project.get({ plain: true}));
    res.render('homepage', {projects})
    console.log(projects)
  }
  catch(err){
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
