/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
const { uuid } = require('uuidv4');

const { Package, Feature } = require('../../../Models/index');

exports.create = async (req, res) => {
  try {
    const package_id = uuid();
    const { package_name, price, description, features } = req.body;

    // check if package name already exist
    const query = await Package.findOne({
      where: { package_name },
    });

    if (query) {
      req.flash('error', 'This Package already exists.');
      return res.redirect('/admin/packages/');
    } else {
      const result = await Package.create({
        package_name,
        price,
        description,
        package_id,
      });

      //now we add features
      //first, check if one or more features were checked
      //then add accordingly
      if (features) {
        if (features.length == 0) {
          req.flash(
            'error',
            'Kindly select a supported Feature for this Package',
          );
          return res.redirect('/admin/packages');
        } else if (features.length == 1) {
          const feature = await Feature.findByPk(features);
          await result.addFeature(feature);
        } else {
          features.forEach(async (id) => {
            const feature = await Feature.findByPk(id);
            await result.addFeature(feature);
          });
        }
      }
      //Success Response
      req.flash('success', 'Package created Successfully');
      return res.redirect('/admin/packages');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/admin/packages');
  }
};

exports.get_create = async (req, res) => {
  try {
    const features = await Feature.findAll();

    const data = await features;
    console.log("here")
    console.log(data)
    res.render('Pages/admin/package-detail', {
      pageName: 'Package Create Form',
      path: 'packages',
      data,
    });
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

exports.getAll = async (req, res) => {
  try {
    const packages = await Package.findAll({
      include: {
        model: Feature,
        as: 'features',
      },
    });
    const allFeatures = await Feature.findAll();

    //Success Response
    const data = { packages, allFeatures };
    res.render('Pages/admin/getAllpackages', {
      pageName: 'Packages',
      path: 'packages',
      data,
    });
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

exports.packageGet = async (req, res) => {
  try {
    const { package_id } = req.params;

    const package = await Package.findOne({
      where: {
        package_id: package_id.toString(),
      },
      include: {
        model: Feature,
        as: 'features',
      },
    });
    const features = await Feature.findAll();
    if (!package) {
      req.flash('error', 'Package Not Found');
      return res.redirect('back');
    }

    //Success Response
    res.render('Pages/admin/package-detail', {
      pageName: `${package.package_name} Package`,
      path: 'packages',
      data: {
        package,
        features,
      },
    });
  } catch (err) {
    req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

exports.packageUpdate = async (req, res) => {
  try {
    const { package_name, price, description, duration, features } = req.body;

    // check if package name already exist
    const query = await Package.findOne({
      where: { package_name },
    });

    if (query && query.package_id != req.params.package_id) {
      req.flash('error', 'This Package already exists.');
      return res.redirect('/admin/packages');
    } else {
      const result = await Package.update(
        {
          package_name,
          price,
          description,
        },
        {
          where: { package_id: req.params.package_id },
        },
      );

      //Success Response
      req.flash('success', 'Update Successful');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/admin/packages');
  }
};

exports.get_packageUpdate = async (req, res) => {
  try {
    const package = await Package.findOne({
      where: { package_id: req.params.package_id },
    });
    if (!package) {
      req.flash('error', 'Invalid Inputs');
      return res.redirect('back');
    }

    //Success response
    const data = await package;
    res.render('Pages/admin/package-update', {
      pageName: 'Package Update Form',
      path: 'packages',
      data,
    });
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

exports.softDeletePackage = (req, res) => {
  const { package_id } = req.params;

  Package.destroy({
    where: { package_id },
  })
    .then((num) => {
      if (num === 1) {
        req.flash('success', 'Package is soft-deleted.');
        return res.redirect('/admin/packages');
      }
      req.flash('error', 'This Package is NOT deleted.');
      return res.redirect('/admin/packages');
    })
    .catch((err) => {
      req.flash('error', 'Something went wrong.');
      return res.redirect('/admin/packages');
    });
};

exports.restoreDeletedPackage = (req, res) => {
  const { package_id } = req.params;

  Package.restore({
    where: { package_id },
  })
    .then((num) => {
      if (num === 1) {
        req.flash('Success', 'Package is restored.');
        return res.redirect('/admin/packages');
      }
      req.flash('error', 'Package is NOT restored.');
      return res.redirect('/admin/packages');
    })
    .catch((err) => {
      req.flash('error', 'Something went wrong.');
      return res.redirect('/admin/packages');
    });
};

exports.addAFeature = async (req, res) => {
  try {
    const feature_id = req.body.feature_id.trim();
    const package = await Package.findOne({
      where: { package_id: req.params.package_id.toString() },
    });
    const feature = await Feature.findAll({
      where: { feature_id: `${feature_id}` },
    });

    if (!package || !feature) {
      req.flash('error', 'Invalid Inputs');
      return res.redirect('back');
    }

    //add the feature
    await package.addFeature(feature);

    //Success Response
    req.flash('success', 'Feature added successfully');
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    // return res.redirect('/admin/packages');
  }
};

exports.removeAFeature = async (req, res) => {
  try {
    const feature_id = req.body.feature_id.trim();
    const package = await Package.findOne({
      where: { package_id: req.params.package_id.toString() },
    });
    const feature = await Feature.findAll({
      where: { feature_id: `${feature_id}` },
    });

    if (!package || !feature) {
      req.flash('error', 'Invalid Inputs');
      return res.redirect('back');
    }

    //add the feature
    await package.removeFeature(feature);

    //Success Response
    req.flash('success', 'Feature removed successfully');
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature_id = uuid();
    const { description } = req.body;

    //check for a duplicate
    const check = await Feature.findOne({
      where: { description },
    });
    if (check) {
      req.flash('error', 'This Feature already exists');
      res.redirect('/admin/packages');
    } else {
      await Feature.create({ description, feature_id });

      req.flash('success', 'Feature created successfully');
      res.redirect('/admin/packages');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/admin/packages');
  }
};
