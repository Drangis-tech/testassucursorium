import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Boxes() {
  // Svg animation
  useEffect(() => {
    const path = document.getElementById('path');
    const length = path.getTotalLength();

    // Set the path to not be visible initially
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.squiggle-les',
        start: 'clamp(top center)',
        end: 'bottom center',
        markers: true,
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <svg
        preserveAspectRatio="xMidyMid meet"
        className="squiggle-les"
        viewBox="0 0 1000 2000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="path"
          d="M-24.5 101C285 315 50.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852"
          stroke="#CD3C2F"
          stroke-width="30"
          stroke-linejoin="round"
        />
      </svg>

      <div className="container content les">
        <div className="row">
          <div className="col-md-6 mb-4 d-flex justify-content-center align-items-center les">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw3GmycEzXNMXcSpb2oe3qNU&ust=1724943062886000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNii3eX3l4gDFQAAAAAdAAAAABAE"
              className="img-fluid"
              alt="Bundel thumbnail"
            />
          </div>
          <div className="col-md-6">
            <h1>Bundel A</h1>
            <p>Description</p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="accordion mt-3" id="accordionLes1">
              <div className="accordion-item">
                <h2 className="accordion-header" id="accordionBundelheadingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionBundelcollapseOne"
                    aria-expanded="true"
                    aria-controls="accordionBundelcollapseOne"
                  >
                    Leerdoelen
                  </button>
                </h2>
                <div
                  id="accordionBundelcollapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="#accordionBundelheadingOne"
                  data-bs-parent={'accordionLes' + 1}
                >
                  <div className="accordion-body">
                    <li>Yes</li>
                    <li>Yes</li>
                    <li>Yes</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row reveal d-flex justify-content-start mt-5 mb-5"
          key="1"
        >
          <div className="bundel col-lg-8 col-md-10 col-12" id={'bundel' + 1}>
            <div className="d-flex justify-content-space-evenly">
              <div className="img-box">
                <img
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw3GmycEzXNMXcSpb2oe3qNU&ust=1724943062886000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNii3eX3l4gDFQAAAAAdAAAAABAE"
                  className="img-fluid"
                  alt="Les thumbnail"
                />
              </div>

              <div className="text-box">
                <h1>Les 1</h1>
                <p>Description</p>
              </div>
            </div>

            <div className="accordion mt-3" id={'accordionLes' + 1}>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={'accordionLes' + 1 + 'headingOne'}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={'#accordionLes' + 1 + 'collapseOne'}
                    aria-expanded="true"
                    aria-controls={'accordionLes' + 1 + 'collapseOne'}
                  >
                    Leerdoelen
                  </button>
                </h2>
                <div
                  id={'accordionLes' + 1 + 'collapseOne'}
                  className="accordion-collapse collapse"
                  aria-labelledby={'#accordionLes' + 1 + 'headingOne'}
                  data-bs-parent={'#accordionLes' + 1}
                >
                  <div className="accordion-body">
                    <li>Yes</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row reveal d-flex justify-content-start mt-5 mb-5"
          key="1"
        >
          <div className="bundel col-lg-8 col-md-10 col-12" id={'bundel' + 1}>
            <div className="d-flex justify-content-space-evenly">
              <div className="img-box">
                <img
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw3GmycEzXNMXcSpb2oe3qNU&ust=1724943062886000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNii3eX3l4gDFQAAAAAdAAAAABAE"
                  className="img-fluid"
                  alt="Les thumbnail"
                />
              </div>

              <div className="text-box">
                <h1>Les 1</h1>
                <p>Description</p>
              </div>
            </div>

            <div className="accordion mt-3" id={'accordionLes' + 1}>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={'accordionLes' + 1 + 'headingOne'}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={'#accordionLes' + 1 + 'collapseOne'}
                    aria-expanded="true"
                    aria-controls={'accordionLes' + 1 + 'collapseOne'}
                  >
                    Leerdoelen
                  </button>
                </h2>
                <div
                  id={'accordionLes' + 1 + 'collapseOne'}
                  className="accordion-collapse collapse"
                  aria-labelledby={'#accordionLes' + 1 + 'headingOne'}
                  data-bs-parent={'#accordionLes' + 1}
                >
                  <div className="accordion-body">
                    <li>Yes</li>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row reveal d-flex justify-content-start mt-5 mb-5"
            key="1"
          >
            <div className="bundel col-lg-8 col-md-10 col-12" id={'bundel' + 1}>
              <div className="d-flex justify-content-space-evenly">
                <div className="img-box">
                  <img
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw3GmycEzXNMXcSpb2oe3qNU&ust=1724943062886000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNii3eX3l4gDFQAAAAAdAAAAABAE"
                    className="img-fluid"
                    alt="Les thumbnail"
                  />
                </div>

                <div className="text-box">
                  <h1>Les 1</h1>
                  <p>Description</p>
                </div>
              </div>

              <div className="accordion mt-3" id={'accordionLes' + 1}>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={'accordionLes' + 1 + 'headingOne'}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={'#accordionLes' + 1 + 'collapseOne'}
                      aria-expanded="true"
                      aria-controls={'accordionLes' + 1 + 'collapseOne'}
                    >
                      Leerdoelen
                    </button>
                  </h2>
                  <div
                    id={'accordionLes' + 1 + 'collapseOne'}
                    className="accordion-collapse collapse"
                    aria-labelledby={'#accordionLes' + 1 + 'headingOne'}
                    data-bs-parent={'#accordionLes' + 1}
                  >
                    <div className="accordion-body">
                      <li>Yes</li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-lg-start">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/in/john-van-seggelen-1b197a243/"
              className="me-4 social"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Kooperdraat
                </h6>
                <p>
                  Kooperdraat is een eenman's bedrijf gedreven door een
                  enthousiaste leraar. Zijn doel is om kinderen uit hun
                  comfortzone te halen door te doen.
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i>{' '}
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
