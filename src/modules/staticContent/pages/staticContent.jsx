import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import { useStaticContentStore } from "../store/staticContent.store";

// ─── Tab Config ────────────────────────────────────────────────────────────
const TABS = [
  { key: "aboutUs", label: "About Us", type: "aboutUs" },
  { key: "benefit", label: "Benefit", type: "benefits" },
  { key: "terms", label: "Term & Condition", type: "termsConditions" },
  { key: "privacy", label: "Privacy Policy", type: "privacyPolicy" },
];

// ─── Renders content: handles array of FAQ-like objects OR single HTML/text ──
const ContentRenderer = ({ content, loading }) => {
  if (loading) return <p className="text-center py-3">Loading...</p>;

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return <p className="text-center py-3">No content available.</p>;
  }

  // Case 1: Array of FAQ-style objects -> render accordion
  if (Array.isArray(content)) {
    // If items look like FAQs (have title/question + description/answer)
    const isFaqLike = content.every(
      (item) =>
        typeof item === "object" &&
        (item.title || item.question) &&
        (item.description || item.answer || item.content)
    );

    if (isFaqLike) {
      return (
        <Accordion defaultActiveKey="0" className="commonAccordion">
          {content.map((item, index) => (
            <Accordion.Item eventKey={String(index)} key={item._id || index}>
              <Accordion.Header>
                {item.title || item.question}
              </Accordion.Header>
              <Accordion.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description || item.answer || item.content,
                  }}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      );
    }

    // Fallback: array of plain strings or unknown objects
    return (
      <div className="staticContentArea">
        {content.map((item, index) => (
          <p key={index}>
            {typeof item === "string"
              ? item
              : item.description || item.content || JSON.stringify(item)}
          </p>
        ))}
      </div>
    );
  }

  // Case 2: Single object with content/description/html field
  if (typeof content === "object") {
    const html =
      content.content || content.description || content.html || "";
    return (
      <div
        className="staticContentArea"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Case 3: Plain string (HTML or text)
  return (
    <div
      className="staticContentArea"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const StaticContent = () => {
  const { content, loading, getStaticContent, clearContent } =
    useStaticContentStore();

  const [activeTab, setActiveTab] = useState(TABS[0].key);

  useEffect(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    clearContent();
    getStaticContent(tab.type);
  }, [activeTab]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <Tab.Container
          id="static-content-tabs"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <div className="commonTabs">
            <Nav fill>
              {TABS.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          <Tab.Content>
            {TABS.map((tab) => (
              <Tab.Pane eventKey={tab.key} key={tab.key}>
                {activeTab === tab.key && (
                  <ContentRenderer content={content} loading={loading} />
                )}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default StaticContent;